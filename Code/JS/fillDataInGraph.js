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

		var variables = ["Life Ladder", "Log GDP per capita", "Social support", "Healthy life expectancy at birth",
			"Freedom to make life choices", "Generosity", "Perceptions of corruption", "Positive affect",
			"Negative affect", "Confidence in national government", "Democratic Quality"];

		var col = [["#d2691e", "#fcf1e9"], ["#d62f29", "#fbeaea"], ["#b04f66", "#f7edf0"], ["#7e629d", "#f2eff5"],
			["#92b558", "#f3f7ed"], ["#ad5d5d", "#f6eeee"], ["#588c7e", "#eff5f4"], ["#41ab5d", "#d9f0a3"],
			["#e08214", "#fee0b6"], ["#01665e", "#c7eae5"], ["#8c510a", "#dfc27d"]];

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
				return tooltip.style("visibility", "visible");
			})
				.on("mousemove", function () {
					return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
				})
				.on("mouseout", function () {
					return tooltip.style("visibility", "hidden");
				});
		});
	});
}