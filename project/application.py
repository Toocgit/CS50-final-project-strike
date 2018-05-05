from cs50 import SQL
from flask import Flask, jsonify, flash, redirect, render_template, request, session, url_for
from flask_session import Session
from passlib.apps import custom_app_context as pwd_context
from tempfile import mkdtemp
import json
import datetime
from helpers import *

# configure application
app = Flask(__name__)

# ensure responses aren't cached
if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# configure CS50 Library to use SQLite database
db = SQL("sqlite:///warriors.db")

# code below okay.
@app.route("/")
@login_required
def index():
    return render_template("home.html")

# code below okay.
@app.route("/analytics")
@login_required
def analytics():
    return render_template("graph.html")

# code below okay.
@app.route("/deadlift")
@login_required
def deadlift():
    """Get deadlift personal records and return as JSON."""
    # Get deadlift personal records.
    deadlift = db.execute("""SELECT * FROM personal_records AS pr
    LEFT JOIN repetitions AS rep
    ON pr.repetitions = rep.reps
    WHERE pr.user_id = :user_id
    AND pr.exercise = "Deadlift (conventional)"
    ORDER BY rep.reps_id, pr.date;""", user_id=session["user_id"])

    # Return SQL query results as JSON.
    return jsonify(deadlift)

# code below okay.
@app.route("/squat")
@login_required
def squat():
    """Get squat personal records and return as JSON."""
    # Get squat personal records.
    squat = db.execute("""SELECT * FROM personal_records AS pr
    LEFT JOIN repetitions AS rep
    ON pr.repetitions = rep.reps
    WHERE pr.user_id = :user_id
    AND pr.exercise = "Squat (back)"
    ORDER BY rep.reps_id, pr.date;""", user_id=session["user_id"])

    # Return SQL query results as JSON.
    return jsonify(squat)

# code below okay.
@app.route("/ohp")
@login_required
def ohp():
    """Get overhead press personal records and return as JSON."""
    # Get overhead press personal records.
    ohp = db.execute("""SELECT * FROM personal_records AS pr
    LEFT JOIN repetitions AS rep
    ON pr.repetitions = rep.reps
    WHERE pr.user_id = :user_id
    AND pr.exercise = "Overhead Press (barbell)"
    ORDER BY rep.reps_id, pr.date;""", user_id=session["user_id"])

    # Return SQL query results as JSON.
    return jsonify(ohp)

# code below okay.
@app.route("/bench")
@login_required
def bench():
    """Get bench personal records and return as JSON."""
    # Get bench personal records.
    bench = db.execute("""SELECT * FROM personal_records AS pr
    LEFT JOIN repetitions AS rep
    ON pr.repetitions = rep.reps
    WHERE pr.user_id = :user_id
    AND pr.exercise = "Bench Press"
    ORDER BY rep.reps_id, pr.date;""", user_id=session["user_id"])

    # Return SQL query results as JSON.
    return jsonify(bench)

# code below okay.
@app.route("/record", methods=["GET", "POST"])
@login_required
def record():
    """Allow user to store weightlifting records."""
    if request.method == "POST":

        # Check for weight information.
        if not request.form.get("Weight"):
            flash("Please provide weight.")
            return redirect(url_for("record"))

        # Check for date information.
        if not request.form.get("Date"):
            flash("Please provide date.")
            return redirect(url_for("record"))

        # Convert weight to integer.
        try:
            weight = int(request.form.get("Weight"))
        except:
            flash("Please provide weight as integer.")
            return redirect(url_for("record"))

        # Check weight is positive.
        if weight <= 0:
            flash("Weight must be a positive integer.")
            return redirect(url_for("record"))

        # Ensure date format is YYYY-MM-DD.
        try:
            datetime.datetime.strptime(request.form.get("Date"), '%Y-%m-%d')
        except:
            flash("Incorrect date format, should be YYYY-MM-DD.")
            return redirect(url_for("record"))

        # Add personal record to database.
        record = db.execute("""INSERT INTO personal_records (user_id, exercise,
        repetitions, weight_kg, date) VALUES (:user_id, :exercise, :repetitions,
        :weight_kg, :date);""", user_id=session["user_id"],
        exercise=request.form.get("Exercise"),
        repetitions=request.form.get("Repetitions"),
        weight_kg=request.form.get("Weight"),
        date=request.form.get("Date"))

        # Check database record added successfully.
        if not record:
            flash("Could not add personal record to database.")
            return redirect(url_for("record"))
        else:
            flash("Personal record saved.")
            return redirect(url_for("record"))

    else:
        return render_template("record.html")

# code below okay.
@app.route("/getstarted")
@login_required
def getstarted():
    """Render web page."""
    return render_template("getstarted.html")

# code below okay.
@app.route("/logout")
@login_required
def logout():
    """Log user out."""
    # forget any user_id
    session.clear()

    # redirect user to login form
    return redirect(url_for("login"))

# code below okay.
@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in."""
    # forget any user_id
    session.clear()

    if request.method == "POST":
        # ensure username was submitted
        if not request.form.get("username"):
            flash("Please provide username.")
            return render_template("login.html")

        # ensure password was submitted
        if not request.form.get("password"):
            flash("Please provide password.")
            return render_template("login.html")

        # query database for username
        rows = db.execute("SELECT * FROM users WHERE username = :username;",
        username=request.form.get("username"))

        # ensure username exists and password is correct
        if len(rows) != 1 or not pwd_context.verify(request.form.get("password"), rows[0]["hash"]):
            flash("Invalid username and/or password.")
            return render_template("login.html")

        # remember which user has logged in
        session["user_id"] = rows[0]["id"]

        # redirect user to home page
        return redirect(url_for("index"))

    # else if user reached route via GET
    else:
        return render_template("login.html")

# code below okay.
@app.route("/join", methods=["GET", "POST"])
def join():
    """Register user."""
    if request.method == "POST":
        # Check for username.
        if not request.form.get("username"):
            flash("Please provide a username.")
            return render_template("join.html")

        # Check username available.
        available = db.execute("SELECT * FROM users WHERE username = :username;",
        username=request.form.get("username"))
        if len(available) > 0:
            flash("Username taken.")
            return render_template("join.html")

        # Check for password.
        if not request.form.get("password"):
            flash("Please provide a password.")
            return render_template("join.html")

        # Check password confirmed.
        if not request.form.get("passwordTwo"):
            flash("Please confirm password.")
            return render_template("join.html")

        # Check password entries matching.
        if request.form.get("password") != request.form.get("passwordTwo"):
            flash("Password entries do not match.")
            return render_template("join.html")

        # Encrypt password.
        hash = pwd_context.hash(request.form.get("password"))

        # Add user to DB users table.
        result = db.execute("INSERT INTO users (username, hash) VALUES (:username, :hash);",
        username = request.form.get("username"), hash = hash)
        if not result:
            flash("Could not register.")
            return render_template("join.html")

        # Log registered user in.
        session["user_id"] = result

        # Redirect user to home page.
        return redirect(url_for("index"))

    else:
        # Take user to registration page.
        return render_template("join.html")