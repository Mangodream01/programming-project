// function 1 fill data in graph
function fillDataInGraph(year, variable) {
	d3.json("Code/PY and files/file.json", function (error, data) {
		if (error) throw error;

		// empty scoreArray
		var scoreArray = [];

		// get all scores over all years
		Object.keys(data).forEach(function(years){
			Object.keys(data[years]).forEach(function(countries){
				scoreArray.push(+data[years][countries][variable])
			});
		});

		var variables = ["Life Ladder",
			"Log GDP per capita",
			"Social support",
			"Healthy life expectancy at birth",
			"Freedom to make life choices",
			"Generosity",
			"Perceptions of corruption",
			"Positive affect",
			"Negative affect",
			"Confidence in national government",
			"Democratic Quality"];

		var col = [["#672e3b", "#f7edf0"],
			["#b04f66", "#f7edf0"],
			["#647d4f", "#e5ebe0"],
			["#617c36", "#f3f7ed"],
			["#50394c", "#eae1e8"],
			["#ad5d5d", "#f6eeee"],
			["#b47e4b", "#f7f2ed"],
			["#7a7a52", "#e0e0d1"],
			["#D2691E", "#fee0b6"],
			["#9c9a40", "#e9e8c9"],
			["#b88961", "#f7f2ed"]];

		// color per variable
		for (var i = 0; i < variables.length; i++){
			if (variable == variables[i]) {
				var color = col[i];
			}
		}

		// outer bounds color coding
		var min = Math.round(d3.min(scoreArray) * 100) / 100;
		var max = Math.round(d3.max(scoreArray) * 100) / 100;			// in legenda op 1 decimaal?

		// scale values, assign color
		var linear = d3.scaleLinear()
			.domain([max, min])
			.range(color);

		var svg = d3.select("svg");

		if (d3.select("#test" == [])){
			d3.select("#test").remove();
		}

		svg.append("g")
			.attr("id", "test")
			.attr("class", "legendLinear")
			.attr("transform", "translate(0,295)");

		// draw legend
		var legendLinear = d3.legendColor()
			.shapeWidth(20)
			.cells(9)
			.orient('vertical')
			.scale(linear);

		svg.select(".legendLinear")
			.call(legendLinear);

		// loop over specific year by slider
		Object.keys(data[year]).forEach(function (country) {
			// loop over EU country
			var score = +data[year][country][variable];
			var curCountry = "#" + country;

			// fill country
			var color = linear(score);
			d3.select(curCountry).attr("fill", color);

			// Define the div for the tooltip
			var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltipje")
				.style("position", "absolute")
				.style("visibility", "hidden")
				.html(function () {
					return "Country: " + data[year][country]["Country"] + '<br>' +
						variable + ": " + Math.round(score * 100) / 100;
				});

			// show tooltip if hover
			d3.select(curCountry).on("mouseover", function () {
				return tooltip.style("visibility", "visible");})
				.on("mousemove", function () {
					return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
				.on("mouseout", function () {
					return tooltip.style("visibility", "hidden");});

			// select line in graph
			var country_name = "#" + data[year][country]["Country"];

			// select line parallel coordinates when country clicked
			d4.select(curCountry).on("click", function(){
				d4.select(country_name)
					.style("stroke", "#92B558")
					.style("stroke-width", "4")
					.style("fill-opacity", 0.8);
			});
		});
	});
}