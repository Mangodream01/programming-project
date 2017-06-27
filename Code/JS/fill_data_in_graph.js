/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to fill the specific happiness data (variable and year) in the EU map
 */

// fill data in graph
function fill_data_in_graph(year, variable) {
	d3.json("Code/PY and files/file.json", function (error, data) {
		if (error) throw error;

		// add subtitle
		d3.select("#sub").remove();
		d3.select("#title")
			.append("div")
			.attr("id", "sub")
			.text(variable + " in " + year)
			.style("font-style", "italic");

		// empty score array
		var score_array = [];

		// get all scores over all years
		Object.keys(data).forEach(function (years) {
			Object.keys(data[years]).forEach(function (countries) {
				score_array.push(+data[years][countries][variable])
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
		for (var i = 0; i < variables.length; i++) {
			if (variable == variables[i]) {
				var color = col[i];
			}
		}

		// outer bounds color coding
		var min = Math.round(d3.min(score_array) * 100) / 100;
		var max = Math.round(d3.max(score_array) * 100) / 100;

		// scale values, assign color
		var linear = d3.scaleLinear()
			.domain([max, min])
			.range(color);

		var svg = d3.select("svg");

		if (d3.select("#leg" == [])) {
			d3.select("#leg").remove();
		}

		svg.append("g")
			.attr("id", "leg")
			.attr("class", "legendLinear")
			.attr("transform", "translate(0,295)");

		// draw legend
		var legendLinear = d3.legendColor()
			.shapeWidth(20)
			.cells(9)
			.orient("vertical")
			.scale(linear);

		svg.select(".legendLinear")
			.call(legendLinear);

		// empty arrays
		var arr = [];
		var arr2 = [];

		// function: is object in array
		function include(arr,obj) {
			return (arr.indexOf(obj) != -1);
		}

		// loop over specific year by slider
		Object.keys(data[year]).forEach(function (country) {
			// loop over EU country
			var score = +data[year][country][variable];
			var curCountry = "#" + country;
			var country_name = "#" + data[year][country]["Country"];
			var dot_name = country_name + "_" + year;
			var color = linear(score);

			// fill country
			d3.select(curCountry).attr("fill", color);

			// Define the div for the tooltip
			var tooltip = d3.select("body")
				.append("div")
				.attr("class", "tooltipje")
				.style("position", "absolute")
				.style("visibility", "hidden")
				.html(function () {
					return data[year][country]["Country"] + "<br>" +
						variable + ": " + Math.round(score * 100) / 100;
				});

			// hover events: tooltip and parallel coordinates
			d3.select(curCountry)
				.on("click", function () {
					// select line in parallel coordinates
					if (arr.length < 1){
						arr.push(curCountry);
						select_line(country_name);
					}
					else{
						// push country off array
						if (include(arr, curCountry)){
							var index = arr.indexOf(curCountry);
							arr.splice(index, 1);
							unselect_line(country_name);
						}

						else {
							// push country on array
							arr.push(curCountry);
						}
					}

					// select dot in scatter plot
					if (arr2.length < 1){
						arr2.push(curCountry);
						select_dot(dot_name);
					}
					else{
						// push country off array
						if (include(arr2, curCountry)){
							var index = arr2.indexOf(curCountry);
							arr2.splice(index, 1);
							unselect_line(dot_name);
						}

						else {
							// push country on array
							arr2.push(curCountry);
						}
					}
				})
				.on("mouseover", function () {
					return tooltip.style("visibility", "visible");
				})
				.on("mousemove", function () {
					return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
				})
				.on("mouseout", function () {
					return tooltip.style("visibility", "hidden");
				});
		})
	})
}

