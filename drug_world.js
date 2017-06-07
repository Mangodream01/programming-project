/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create an interactive world map
 */

// make map
window.onload = function() {
    // width and height
    var w = 800;
    var h = 600;

    // define map projection
    var projection = d3.geo.mercator()
                       .center([ 13, 52 ])
                       .translate([ w/2, h/2 ])
                       .scale([ w/1.5 ]);

    // define path generator
    var path = d3.geo.path()
                     .projection(projection);

    // create svg
    var svg = d3.select("#container")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

    //Load in GeoJSON data
			d3.json("raw.json", function(json) {

				//Bind data and create one path per GeoJSON feature
				svg.selectAll("path")
				   .data(json.features)
				   .enter()
				   .append("path")
				   .attr("d", path)
				   .attr("stroke", "rgba(8, 81, 156, 0.2)")
				   .attr("fill", "rgba(8, 81, 156, 0.6)");
			});
};

