/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create an interactive world map
 */

// make map
window.onload = function() {

	// colors
	var c = ['#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788'];

	// width and height
	var w = 600;
	var h = 450;

	// define map projection
	var projection = d3.geo.mercator()
		.center([13, 52])
		.translate([w / 2, h / 2])
		.scale([w / 1.5]);

	// define path generator
	var path = d3.geo.path()
		.projection(projection);

	// create svg
	var svg = d3.select("#container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Load in GeoJSON data
	d3.json("raw.json", function (json) {

		//Bind data and create one path per GeoJSON feature
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("id", function (d) {
				return d.properties["iso_a3"]
			})
			.attr("stroke", "#ffffff")
			.attr("fill", "#ffffff");

		fillDataInGraph("2012", "Life Ladder");

		// // time slider
		// var svg = d3.select("#slider"),
		// 	margin = {top: 40, right: 40, bottom: 40, left: 40},
		// 	width = svg.attr("width") - margin.left - margin.right,
		// 	midX = width/2,
		// 	height = svg.attr("height") - margin.top - margin.bottom;

		// var y = d3.scale.linear()
		//         .domain([180, 0])
		//         .range([0, height])
		//         .clamp(true);
		//
		// var brush = d3.svg.brush()
		//         .y(y)
		//         .extent([0, 0])
		//         .on("brush", brushed);
		//
		// var g = svg.append("g")
		//         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		//
		// var slider = g.append("g")
		//         .attr("transform", "translate(" + midX + ", 0)");
		//
		// slider.append("g")
		//         .attr("class", "y axis")
		//         .call(d3.svg.axis()
		//                 .scale(y)
		//                 .orient("right")
		//                 .tickFormat(function(d) { return d + "°"; })
		//                 .tickSize(0)
		//                 .tickPadding(13))
		//         .select(".domain")
		//         .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
		//         .attr("class", "halo");
		//
		// var prevVal = 0;
		// var handle = slider.append("path")
		//         .attr("class", "handle")
		//         .attr("d", "M-7 -4 L-7 4 L-5 6 L5 6 L11 0 L5 -6 L-5 -6 Z")
		//         .attr("transform", "translate(0, " + y(prevVal) + ")");
		//
		// d3.select("body")
		//         .style("background-color", d3.hsl(y(prevVal), .8, .8));
		//
		// var ruler = slider.append("g")
		//         .attr("transform", "translate(-4, 0)")
		//         .attr("class", "ruler")
		//         .call(brush);
		//
		// ruler.selectAll(".extent,.resize")
		//         .remove();
		//
		// ruler.select(".background")
		//         .style("cursor", "ns-resize")
		//         .attr("width", 40);
		//
		// // initial animation
		// ruler.call(brush.event)
		//         .transition()
		//         .duration(750)
		//         .ease("out-in")
		//         .call(brush.extent([120, 120]))
		//         .call(brush.event);
		//
		// function brushed() {
		//     var value = brush.extent()[1],
		//         t = d3;
		//
		//     if (d3.event.sourceEvent) { // not a programmatic event
		//         value = y.invert(d3.mouse(this)[1]);
		//         brush.extent([value, value]);
		//         if (d3.event.sourceEvent.type === "mousemove") {
		//             // interrupt transition
		//             handle.interrupt();
		//             d3.select("body").interrupt();
		//         } else if (value != prevVal) {
		//             // animate when is't a click, not a drag
		//             t = d3.transition()
		//                     .duration(Math.abs(y(value) - y(prevVal)))
		//                     .ease("out-in");
		//         }
		//     }
		//
		//     t.select(".handle")
		//         .attr("transform", "translate(0, " + y(value) + ")");
		//     t.select("body")
		//         .style("background-color", d3.hsl(value, .8, .8));
		//
		//     prevVal = value;
		// }



	});

	function fillDataInGraph(year, variable) {
		d3.json("./file.json", function (error, data) {
			if (error) throw error;

			// // scales
			// var bucket = [[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],	// extra 8 added!
			// 	[9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11],
			// 	[0.7, 0.73, 0.76, 0.79, 0.82, 0.85, 0.88, 0.91],
			// 	[61, 62.5, 64, 65.5, 67, 68.5, 70, 71.5],
			// 	[0.3, 0.375, 0.45, 0.525, 0.6, 0.675, 0.75, 0.825],
			// 	[-0.3, -0.225, -0.15, 0.075, 0, 0.075, 0.15, 0.225, 0.3],
			// 	[0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
			// 	[0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85],
			// 	[0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.48],
			// 	[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
			// 	[-1, -0.55, -0.1, 0, 0.35, 0.8, 1.25, 1.7]
			// ];

			// // which list
			// var variables = ["Life Ladder", "Log GDP per capita", "Social support", "Healthy life expectancy at birth",
			// 	"Freedom to make life choices", "Generosity", "Perceptions of corruption", "Positive affect",
			// 	"Negative affect", "Confidence in national government", "Democratic Quality"];


			// // buckets per variable
			// var b;
			// for (var i = 0; i < variables.length; i++) {
			// 	if (variable == variables[i]) {
			// 		b = bucket[i];
			// 	}
			// }




			// collect all scores
			var scoreArray = [];

			// loop over year
			Object.keys(data[year]).forEach(function (country) {

				// loop over EU country
				var score = +data[year][country][variable];
				var curCountry = "#" + country;
				scoreArray.push(score);

				// Define the div for the tooltip
				var tooltip = d3.select("body")
					.append("div")
					.attr("class", "tooltip")
					.style("position", "absolute")
					.style("z-index", "8")
					.style("visibility", "hidden")
					.html(function () {
						return "Country: " + data["2012"][country]["Country"] + '<br>' +
							variable + ": " + Math.round(score * 100) / 100;
					});

				// show tooltip
				d3.select(curCountry).on("mouseover", function () {
					return tooltip.style("visibility", "visible");
				})
					.on("mousemove", function () {
						return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
					})
					.on("mouseout", function () {
						return tooltip.style("visibility", "hidden");
					});


				// // color coding
				// if (score < b[0]) {
				// 	d3.select(curCountry).attr("fill", c[0]);
				// }
				// else if (score > b[0] && score < b[1]) {
				// 	d3.select(curCountry).attr("fill", c[1]);
				// }
				// else if (score > b[1] && score < b[2]) {
				// 	d3.select(curCountry).attr("fill", c[2]);
				// }
				// else if (score > b[2] && score < b[3]) {
				// 	d3.select(curCountry).attr("fill", c[3]);
				// }
				// else if (score > b[3] && score < b[4]) {
				// 	d3.select(curCountry).attr("fill", c[4]);
				// }
				// else if (score > b[4] && score < b[5]) {
				// 	d3.select(curCountry).attr("fill", c[5]);
				// }
				// else if (score > b[5] && score < b[6]) {
				// 	d3.select(curCountry).attr("fill", c[6]);
				// }
				// else if (score > b[6] && score < b[7]) {
				// 	d3.select(curCountry).attr("fill", c[7]);
				// }
				// else if (score > b[7]) {
				// 	d3.select(curCountry).attr("fill", c[8]);
				// }

			});

			// Math.round(score * 100) / 100


			var min = Math.floor((d3.min(scoreArray) * 100) / 100);
			var max = Math.ceil((d3.max(scoreArray) * 100) / 100);

			// legend
			var linear = d3.scaleLinear()
				.domain([max, min])
				.range(["#3f007d", "#fcfbfd"]);

			var svg = d3.select("svg");

			svg.append("g")
				.attr("class", "legendLinear")
				.attr("transform", "translate(0,285)");

			var legendLinear = d3.legendColor()
				.shapeWidth(20)
				.cells(9)
				.orient('vertical')
				.title("Legend")
  				.titleWidth(100)
				.scale(linear);

			svg.select(".legendLinear")
				.call(legendLinear);

			// color coding
			Object.keys(data[year]).forEach(function (country) {
				var score = +data[year][country][variable];
				var curCountry = "#" + country;

				var color = linear(score);
				d3.select(curCountry).attr("fill", color);
			})

		});

		// change map when button clicked
		d3.selectAll(".m").on("click", function () {
			var variable = this.getAttribute("value");
			fillDataInGraph("2012", variable)

		})
	}
};






