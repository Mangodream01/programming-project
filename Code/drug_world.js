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
			.attr("stroke", "rgba(8, 81, 156, 0.2)")
			.attr("fill", "rgba(8, 81, 156, 0.6)");

		// console.log(json.features);
		fillDataInGraph();
	});

	function fillDataInGraph() {
		d3.json("./file.json", function (error, data) {
			if (error) throw error;

			var c = ['#f1eef6','#d7b5d8','#df65b0','#ce1256'];
			var b = [5, 6, 7];

			// loop over 2012
			Object.keys(data["2012"]).forEach(function (country) {
				// loop over EU country
				var LifeL = +data["2012"][country]["Life Ladder"];
				console.log(LifeL);
				var curCountry = "#" + country;
				if (LifeL < b[0]) {
					d3.select(curCountry).attr("fill", c[0]);
				}
				else if (LifeL > b[0] && LifeL < b[1]){
					d3.select(curCountry).attr("fill", c[1]);
				}
				else if (LifeL > b[1] && LifeL < b[2]){
					d3.select(curCountry).attr("fill", c[2]);
				}
				else if (LifeL > b[2]) {
					d3.select(curCountry).attr("fill", c[3]);
				}
			})
		})
	}
};

								// in 2012:
			// forloop/forEach over data {
			// var curCountry = "#" + data[i]
//				d3.select(curCountry).attr("fill", data[i]["fillColor")
			// }
			// for (i in data["2012"]){

			// d3.select("#FRA").attr("fill", "red");


				// switch (true) {
				// 	case LifeL < 5):
				// 		alert("less than five");
				// 		break;
				// 	case (LifeL > 4 && LifeL < 9):
				// 		alert("between 5 and 8");
				// 		break;
				// 	case (LifeL > 8 && LifeL < 12):
				// 		alert("between 9 and 11");
				// 		break;
				// 	default:
				// 		alert("none");
				// 		break;


										// colorDict {3: "red"}
            //
			// colorDict["3"]

// 			// for loop over dataset
// 			var lifeL = +dataset[i]["Life Ladder"];
// 			console.log(lifeL);
//
// 			switch(lifeL) {
// 				case 0-3 :
// 					dataset[i]["fillColor"] = col[0];
// 					break;
// }
			// }

//
// 			})
// 		})
// 	}
// };

						// in 2012:
			// forloop/forEach over data {
			// var curCountry = "#" + data[i]
//				d3.select(curCountry).attr("fill", data[i]["fillColor")
			// }
			// for (i in data["2012"]){

			// d3.select("#FRA").attr("fill", "red");

			// var lifeL = +data["2012"]["FRA"]["Life Ladder"];








			// zo kom ik bij id (country_code) map
			// console.log(svg.selectAll("path")[0][0]['id']);

			// zo kom ik via country_code bij waarde
			// console.log(data["2005"]["FRA"]["Life Ladder"]);



