// function 1 fill data in graph
function fillDataInGraph(year, variable) {
	d3.json("./file.json", function (error, data) {
		if (error) throw error;

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

		try {
			d3.select(".LegendLinear").remove();
		}
		catch (e) {
		}

		// outer bounds color coding
		var min = Math.round(d3.min(scoreArray) * 100) / 100;
		var max = Math.round(d3.max(scoreArray) * 100) / 100;			// in legenda op 1 dec?

		// scale values, assign color
		var linear = d3.scaleLinear()
			.domain([min, max])
			.range(["#d8daeb", "#3f007d"]);
			// .clamp(true);

		var svg = d3.select("svg");

		svg.append("g")
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

		// color coding
		Object.keys(data[year]).forEach(function (country) {
			var score = +data[year][country][variable];
			var curCountry = "#" + country;
			var color = linear(score);
			d3.select(curCountry).attr("fill", color);
		})
	});
}