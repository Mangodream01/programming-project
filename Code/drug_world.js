/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create an interactive world map
 */

// make map
window.onload = function() {

	var years = "2012";
	var variable = "Life Ladder";

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
	var svg_1 = d3.select("#container")
		.append("svg")
		.attr("width", w)
		.attr("height", h);

	//Load in GeoJSON data
	d3.json("raw.json", function (json) {

		//Bind data and create one path per GeoJSON feature
		svg_1.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.attr("id", function (d) {
				return d.properties["iso_a3"]
			})
			.attr("stroke", "#ffffff")
			.attr("fill", "#ffffff");

		// time slider
		insert_slider();

		// first data view
		fillDataInGraph(years, variable);
	});

	// drag years
	d3.select("svg")
		.on("start drag", function() {
			// hue(x.invert(d3.event.x));
			// years = Math.round(x.invert(d3.event.x));
			console.log(years);
			// fillDataInGraph(years, variable);
		});

	// change map when button clicked
	d3.selectAll(".m").on("click", function () {
		var variable = this.getAttribute("value");
		fillDataInGraph(years, variable);
	});
};