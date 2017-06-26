/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create an interactive world map
 */


// load in data from csv
d4.csv("Code/PY and files/file.csv", function(error, data) {
	happydata = data;
});

// global variables
var years = "2012";
var variable = "Life Ladder";
var happydata;
var var1 = "Life Ladder";
var var2 = "Log GDP per capita";

// global function: get year from slider
function give_year (year) {
	fillDataInGraph(year, variable);
	update_graph(year);
}

// make map
window.onload = function() {

	// width and height
	var w = 600; // 400
	var h = 450; // 300

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
	d3.json("Code/PY and files/raw.json", function (json) {

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

		// add parallel coordinates
		add_graph(years);

		// add scatter plot
		scatter(var1, var2);

	});

	// info pop over
	$('[data-toggle="popover"]').popover({
		container: 'body'
	});

	// change map when button clicked
	d3.selectAll(".m").on("click", function () {
		variable = this.getAttribute("value");
		fillDataInGraph(years, variable);
	});
};
