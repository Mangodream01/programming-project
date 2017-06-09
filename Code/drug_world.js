/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create an interactive world map
 */

// make map
window.onload = function() {

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
	});

	function fillDataInGraph(year, variable) {
		d3.json("./file.json", function (error, data) {
			if (error) throw error;

			// colors
			var col = [['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
				['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
				['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
				['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
				['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
				['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
				['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
				['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
				['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
				['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
				['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b']];

			// scales
			var bucket = [[4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8],	// extra 8 added!
				[9.25, 9.5, 9.75, 10, 10.25, 10.5, 10.75, 11],
				[0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
				[60, 62, 64, 66, 68, 70, 72, 74],
				[0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85, 0.95],
				[-0.3, -0.2, -0.1, 0, 0.1, 0.2, 0.3, 0.4],
				[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
				[0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85],
				[0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.48],
				[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
				[-1, -0.55, -0.1, 0, 0.35, 0.8, 1.25, 1.7]
			];

			// which list
			if (variable == "Life Ladder") {
				c = col[0];
				b = bucket[0];
			}
			else if (variable == "Log GDP per capita") {
				c = col[1];
				b = bucket[1];
			}
			else if (variable == "Social support") {
				c = col[2];
				b = bucket[2];
			}
			else if (variable == "Healthy life expectancy at birth") {
				c = col[3];
				b = bucket[3];
			}
			else if (variable == "Freedom to make life choices") {
				c = col[4];
				b = bucket[4];
			}
			else if (variable == "Generosity") {
				c = col[5];
				b = bucket[5];
			}
			else if (variable == "Perceptions of corruption") {
				c = col[6];
				b = bucket[6];
			}
			else if (variable == "Positive affect") {
				c = col[7];
				b = bucket[7];
			}
			else if (variable == "Negative affect") {
				c = col[8];
				b = bucket[8];
			}
			else if (variable == "Confidence in national government") {
				c = col[9];
				b = bucket[9];
			}
			else if (variable == "Democratic Quality") {
				c = col[10];
				b = bucket[10];
			}


			// loop over year
			Object.keys(data[year]).forEach(function (country) {
				// loop over EU country
				var score = +data[year][country][variable];
				var curCountry = "#" + country;

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

				// popupTemplate
				d3.select(curCountry).on("mouseover", function () {
					return tooltip.style("visibility", "visible");
				})
					.on("mousemove", function () {
						return tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
					})
					.on("mouseout", function () {
						return tooltip.style("visibility", "hidden");
					});

				// color coding
				for (var i = 0; i < c[0].length; i++) {
					if (score < b[0]) {
						d3.select(curCountry).attr("fill", c[0]);
					}
					else if (score > b[0] && score < b[1]) {
						d3.select(curCountry).attr("fill", c[1]);
					}
					else if (score > b[1] && score < b[2]) {
						d3.select(curCountry).attr("fill", c[2]);
					}
					else if (score > b[2] && score < b[3]) {
						d3.select(curCountry).attr("fill", c[3]);
					}
					else if (score > b[3] && score < b[4]) {
						d3.select(curCountry).attr("fill", c[4]);
					}
					else if (score > b[4] && score < b[5]) {
						d3.select(curCountry).attr("fill", c[5]);
					}
					else if (score > b[5] && score < b[6]) {
						d3.select(curCountry).attr("fill", c[6]);
					}
					else if (score > b[6] && score < b[7]) {
						d3.select(curCountry).attr("fill", c[7]);
					}
					else if (score > b[7]) {
						d3.select(curCountry).attr("fill", c[8]);
					}
				}
			});

			// legend
			var threshold = d3.scaleThreshold()
				.domain(b)
				.range(c);

			// set linear scale
			var x = d3.scaleLinear()
				.domain([0, 1])
				.range([70, 120]);

			var xAxis = d3.axisBottom(x)
				.tickSize(13)
				.tickValues(threshold.domain())
				.tickFormat(function (d) {
					return d;
				});

			var g = d3.select("g").call(xAxis);
			g.select(".domain")
				.remove();

			g.selectAll("rect")
				.data(threshold.range().map(function (color) {
					var d = threshold.invertExtent(color);
					if (d[0] == null) d[0] = x.domain()[0];
					if (d[1] == null) d[1] = x.domain()[1];
					return d;
				}))
				.enter().insert("rect", ".tick")
				.attr("height", 8)
				.attr("x", function (d) {
					return x(d[0]);
				})
				.attr("width", function (d) {
					return x(d[1]) - x(d[0]);
				})
				.attr("fill", function (d) {
					return threshold(d[0]);
				});
		})
	}

	// change map when button clicked
	d3.selectAll(".m").on("click", function () {
		var variable = this.getAttribute("value");
		fillDataInGraph("2012", variable)

	})
};


			// zo kom ik bij id (country_code) map
			// console.log(svg.selectAll("path")[0][0]['id']);

			// zo kom ik via country_code bij waarde
			// console.log(data["2005"]["FRA"]["Life Ladder"]);



