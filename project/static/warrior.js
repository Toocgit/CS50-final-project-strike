// Bench Press
// Declare 5 variables, each assigned an empty array.
var bOneRep = [];
var bThreeRep = [];
var bFiveRep = [];
var bEightRep = [];
var bTwelveRep = [];

// Request for JSON of bench press personal records.
$.getJSON("/bench")
/* Go through returned JSON data and add to previously created arrays, JS objects
with x axis values and y axis values. */
.done(function(data) {
	for (var bpr = 0; bpr < data.length; bpr++) {
		if (data[bpr].repetitions == "1 rep max") {
			bOneRep.push(
				{
					x: new Date(data[bpr].date),
					y: data[bpr].weight_kg
				}
			);
		} else if (data[bpr].repetitions == "3 rep max") {
			bThreeRep.push(
				{
					x: new Date(data[bpr].date),
					y: data[bpr].weight_kg
				}
			);
		} else if (data[bpr].repetitions == "5 rep max") {
			bFiveRep.push(
				{
					x: new Date(data[bpr].date),
					y: data[bpr].weight_kg
				}
			);
		} else if (data[bpr].repetitions == "8 rep max") {
			bEightRep.push(
				{
					x: new Date(data[bpr].date),
					y: data[bpr].weight_kg
				}
			);
		} else if (data[bpr].repetitions == "12 rep max") {
			bTwelveRep.push(
				{
					x: new Date(data[bpr].date),
					y: data[bpr].weight_kg
				}
			);
		}
	}

	// Instantiate chart object.
	var bchart = new CanvasJS.Chart("Bench", {
		// Set chart options.
		animationEnabled: true,
		animationDuration: 3000,
		zoomEnabled: true,
		zoomType: "xy",
		theme: "light1",
		// Set chart title options.
		title:{
			text: "Bench Press Personal Records",
			fontColor: "#191970"
		},
		// Set y axis options.
		axisY:{
			title: "Weight (kg)",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold",
			includeZero: false
		},
		// Set x axis options.
		axisX:{
			title: "Date",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold"
		},
		// Set legend options.
		legend:{
			horizontalAlign: "center"
		},
		// Including dataSeries objects with data and options set.
		data: [
		{
			name: "1 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "1 rep max",
			dataPoints: bOneRep
		},
		{
			name: "3 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "3 rep max",
			dataPoints: bThreeRep
		},
		{
			name: "5 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "5 rep max",
			dataPoints: bFiveRep
		},
		{
			name: "8 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "8 rep max",
			dataPoints: bEightRep
		},
		{
			name: "12 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "12 rep max",
			dataPoints: bTwelveRep
		}
		]
	});

	// Render chart.
	bchart.render();
})
.always(function() {
	console.log(bOneRep);
	console.log(bThreeRep);
	console.log(bFiveRep);
	console.log(bEightRep);
	console.log(bTwelveRep);
});


// Deadlift
// Declare 5 variables, each assigned an empty array.
var dOneRep = [];
var dThreeRep = [];
var dFiveRep = [];
var dEightRep = [];
var dTwelveRep = [];

// Request for JSON of deadlift personal records.
$.getJSON("/deadlift")
/* Go through returned JSON data and add to previously created arrays, JS objects
with x axis values and y axis values. */
.done(function(data) {
	for (var dpr = 0; dpr < data.length; dpr++) {
		if (data[dpr].repetitions == "1 rep max") {
			dOneRep.push(
				{
					x: new Date(data[dpr].date),
					y: data[dpr].weight_kg
				}
			);
		} else if (data[dpr].repetitions == "3 rep max") {
			dThreeRep.push(
				{
					x: new Date(data[dpr].date),
					y: data[dpr].weight_kg
				}
			);
		} else if (data[dpr].repetitions == "5 rep max") {
			dFiveRep.push(
				{
					x: new Date(data[dpr].date),
					y: data[dpr].weight_kg
				}
			);
		} else if (data[dpr].repetitions == "8 rep max") {
			dEightRep.push(
				{
					x: new Date(data[dpr].date),
					y: data[dpr].weight_kg
				}
			);
		} else if (data[dpr].repetitions == "12 rep max") {
			dTwelveRep.push(
				{
					x: new Date(data[dpr].date),
					y: data[dpr].weight_kg
				}
			);
		}
	}

	// Instantiate chart object.
	var dchart = new CanvasJS.Chart("Deadlift", {
		// Set chart options.
		animationEnabled: true,
		animationDuration: 3000,
		zoomEnabled: true,
		zoomType: "xy",
		theme: "light1",
		// Set chart title options.
		title:{
			text: "Deadlift Personal Records",
			fontColor: "#191970"
		},
		// Set y axis options.
		axisY:{
			title: "Weight (kg)",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold",
			includeZero: false
		},
		// Set x axis options.
		axisX:{
			title: "Date",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold"
		},
		// Set legend options.
		legend:{
			horizontalAlign: "center"
		},
		// Including dataSeries objects with data and options set.
		data: [
		{
			name: "1 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "1 rep max",
			dataPoints: dOneRep
		},
		{
			name: "3 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "3 rep max",
			dataPoints: dThreeRep
		},
		{
			name: "5 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "5 rep max",
			dataPoints: dFiveRep
		},
		{
			name: "8 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "8 rep max",
			dataPoints: dEightRep
		},
		{
			name: "12 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "12 rep max",
			dataPoints: dTwelveRep
		}
		]
	});

	// Render chart.
	dchart.render();
})
.always(function() {
	console.log(dOneRep);
	console.log(dThreeRep);
	console.log(dFiveRep);
	console.log(dEightRep);
	console.log(dTwelveRep);
});


// Squat
// Declare 5 variables, each assigned an empty array.
var sOneRep = [];
var sThreeRep = [];
var sFiveRep = [];
var sEightRep = [];
var sTwelveRep = [];

// Request for JSON of squat personal records.
$.getJSON("/squat")
/* Go through returned JSON data and add to previously created arrays, JS objects
with x axis values and y axis values. */
.done(function(data) {
	for (var spr = 0; spr < data.length; spr++) {
		if (data[spr].repetitions == "1 rep max") {
			sOneRep.push(
				{
					x: new Date(data[spr].date),
					y: data[spr].weight_kg
				}
			);
		} else if (data[spr].repetitions == "3 rep max") {
			sThreeRep.push(
				{
					x: new Date(data[spr].date),
					y: data[spr].weight_kg
				}
			);
		} else if (data[spr].repetitions == "5 rep max") {
			sFiveRep.push(
				{
					x: new Date(data[spr].date),
					y: data[spr].weight_kg
				}
			);
		} else if (data[spr].repetitions == "8 rep max") {
			sEightRep.push(
				{
					x: new Date(data[spr].date),
					y: data[spr].weight_kg
				}
			);
		} else if (data[spr].repetitions == "12 rep max") {
			sTwelveRep.push(
				{
					x: new Date(data[spr].date),
					y: data[spr].weight_kg
				}
			);
		}
	}

	// Instantiate chart object.
	var schart = new CanvasJS.Chart("Squat", {
		// Set chart options.
		animationEnabled: true,
		animationDuration: 3000,
		zoomEnabled: true,
		zoomType: "xy",
		theme: "light1",
		// Set chart title options.
		title:{
			text: "Squat Personal Records",
			fontColor: "#191970"
		},
		// Set y axis options.
		axisY:{
			title: "Weight (kg)",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold",
			includeZero: false
		},
		// Set x axis options.
		axisX:{
			title: "Date",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold"
		},
		// Set legend options.
		legend:{
			horizontalAlign: "center"
		},
		// Including dataSeries objects with data and options set.
		data: [
		{
			name: "1 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "1 rep max",
			dataPoints: sOneRep
		},
		{
			name: "3 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "3 rep max",
			dataPoints: sThreeRep
		},
		{
			name: "5 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "5 rep max",
			dataPoints: sFiveRep
		},
		{
			name: "8 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "8 rep max",
			dataPoints: sEightRep
		},
		{
			name: "12 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "12 rep max",
			dataPoints: sTwelveRep
		}
		]
	});

	// Render chart.
	schart.render();
})
.always(function() {
	console.log(sOneRep);
	console.log(sThreeRep);
	console.log(sFiveRep);
	console.log(sEightRep);
	console.log(sTwelveRep);
});


// Overhead Press
// Declare 5 variables, each assigned an empty array.
var ovOneRep = [];
var ovThreeRep = [];
var ovFiveRep = [];
var ovEightRep = [];
var ovTwelveRep = [];

// Request for JSON of OHP personal records.
$.getJSON("/ohp")
/* Go through returned JSON data and add to previously created arrays, JS objects
with x axis values and y axis values. */
.done(function(data) {
	for (var ovpr = 0; ovpr < data.length; ovpr++) {
		if (data[ovpr].repetitions == "1 rep max") {
			ovOneRep.push(
				{
					x: new Date(data[ovpr].date),
					y: data[ovpr].weight_kg
				}
			);
		} else if (data[ovpr].repetitions == "3 rep max") {
			ovThreeRep.push(
				{
					x: new Date(data[ovpr].date),
					y: data[ovpr].weight_kg
				}
			);
		} else if (data[ovpr].repetitions == "5 rep max") {
			ovFiveRep.push(
				{
					x: new Date(data[ovpr].date),
					y: data[ovpr].weight_kg
				}
			);
		} else if (data[ovpr].repetitions == "8 rep max") {
			ovEightRep.push(
				{
					x: new Date(data[ovpr].date),
					y: data[ovpr].weight_kg
				}
			);
		} else if (data[ovpr].repetitions == "12 rep max") {
			ovTwelveRep.push(
				{
					x: new Date(data[ovpr].date),
					y: data[ovpr].weight_kg
				}
			);
		}
	}

	// Instantiate chart object.
	var ovchart = new CanvasJS.Chart("ovpress", {
		// Set chart options.
		animationEnabled: true,
		animationDuration: 3000,
		zoomEnabled: true,
		zoomType: "xy",
		theme: "light1",
		// Set chart title options.
		title:{
			text: "Overhead Press Personal Records",
			fontColor: "#191970"
		},
		// Set y axis options.
		axisY:{
			title: "Weight (kg)",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold",
			includeZero: false
		},
		// Set x axis options.
		axisX:{
			title: "Date",
			titleFontColor: "#8B0000",
			titleFontWeight: "bold"
		},
		// Set legend options.
		legend:{
			horizontalAlign: "center"
		},
		// Including dataSeries objects with data and options set.
		data: [
		{
			name: "1 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "1 rep max",
			dataPoints: ovOneRep
		},
		{
			name: "3 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "3 rep max",
			dataPoints: ovThreeRep
		},
		{
			name: "5 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "5 rep max",
			dataPoints: ovFiveRep
		},
		{
			name: "8 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "8 rep max",
			dataPoints: ovEightRep
		},
		{
			name: "12 rep max",
			type: "line",
			lineThickness: 5,
			showInLegend: true,
			legendText: "12 rep max",
			dataPoints: ovTwelveRep
		}
		]
	});

	// Render chart.
	ovchart.render();
})
.always(function() {
	console.log(ovOneRep);
	console.log(ovThreeRep);
	console.log(ovFiveRep);
	console.log(ovEightRep);
	console.log(ovTwelveRep);
});