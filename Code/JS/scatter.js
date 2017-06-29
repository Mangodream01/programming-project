/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create a scatter plot.
 */


// highlight dot
function highlight_dot(dot_name){
    return d3.select(dot_name).style("fill-opacity", 1);
}

// unhighlight dot
function unhighlight_dot(dot_name){
    return d3.select(dot_name).style("fill-opacity", 0.3);
}

function set_limits_axes(x, y, xCat, yCat){
    var xMax = d4.max(happydata, function(d) {
        return d[xCat];
    }) * 1.05,
    xMin = d4.min(happydata, function(d) {
        return d[xCat];
    }),
    xMin = xMin > 0 ? 0 : xMin,
    yMax = d4.max(happydata,
        function(d) {
        return d[yCat];
    }) * 1.05,
    yMin = d4.min(happydata, function(d) {
            return d[yCat];
    }),
    yMin = yMin > 0 ? 0 : yMin;

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);
}

// add a scatter plot
function scatter(var1, var2) {

    // d4.select("#scatter").remove();

    // set margins
    var margin = {top: 20, right: 100, bottom: 80, left: 50},
        outerWidth = 800,
        outerHeight = 370,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    // set scales
    var x = d4.scale.linear()
        .range([0, width]).nice();
    var y = d4.scale.linear()
        .range([height, 0]).nice();

    // set categories
    var xCat = var1,
        yCat = var2,
        colorCat = "year";

    // select data
    happydata.forEach(function (d) {
        d[var1] = +d[var1];
        d[var2] = +d[var2];
        d["visible"] = true;
    });

    set_limits_axes(x, y, xCat, yCat);

    var xAxis = d4.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d4.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

    var color = d4.scale.category10();

    // define the div for the tooltip
    var tip = d3.select("body")
        .append("div")
        .attr("class", "tooltipje")
        .style("position", "absolute")
        .style("visibility", "hidden");

    var zoomBeh = d4.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    // create graph
    var svg = d4.select("#scatter_div")
        .append("svg")
        .attr("id", "scatter")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

    // X axis
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .classed("label", true)
        .attr("x", width)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        .text(xCat);

    // Y axis
    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text(yCat);

    var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);

    objects.append("svg:line")
        .classed("axisLine hAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", width)
        .attr("y2", 0)
        .attr("transform", "translate(0," + height + ")");

    objects.append("svg:line")
        .classed("axisLine vAxisLine", true)
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", height);

    // dots in the scatter plot
    var dots = objects.selectAll(".dot")
        .data(happydata)
        .enter().append("circle")
        .classed("dot", true)
        .attr("id", function(d){
            return d["country"] + "_" + d["year"];})
        .attr("r",  5)
        .attr("transform", transform)
        .style("fill", function(d) {
            if (d["visible"] == false){
                return "none";
            }
            else{
                return color(d[colorCat]);
            }
        })
        .on("mouseover", function (d) {
            tip.html(d["country"] + "<br>" +
                xCat + ": " + Math.round(d[xCat] * 100) / 100 + "<br>" +
                yCat + ": " + Math.round(d[yCat] * 100) / 100);
            return tip.style("visibility", "visible");})
        .on("mousemove", function () {
            return tip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");});

    var legend = svg.selectAll(".legend")
        .data(color.domain().sort(d3.descending))
        .enter().append("g")
        .classed("legend", true)
        .attr("class", "legend-box")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("circle")
        .attr("r", 3.5)
        .attr("cx", width + 20)
        .attr("class", "leg_dot")
        .attr("id", function(d){
            return "leg_" + d;})
        .attr("fill", color);

    legend.append("text")
        .attr("x", width + 26)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

    // only display 2012 on start screen
    update_scatter_years("2012");

    // on click make dots visible
    legend.on("click", function(year) {

        var true_or_false = d4.select("#leg_" + year).style("visibility");
        if (true_or_false == "visible"){
            d4.select("#leg_" + year).style("visibility", "hidden");
        }
        else{
            d4.select("#leg_" + year).style("visibility", "visible");
        }

        happydata.forEach(function(d){
            if (d["year"] == year){
                d.visible = !d.visible;
            }
        });
        change_visibility(dots);
    });

    // give X to scatter function
	d4.selectAll(".d").on("click", function () {
		var1 = this.getAttribute("value");
		update_scatter(var1, var2);
	});

	// give Y to scatter function
	d4.selectAll(".e").on("click", function () {
		var2 = this.getAttribute("value");
		update_scatter(var1, var2);
	});

    // update scatter plot if new variable selected
    function update_scatter(var1, var2) {
        xCat = var1;
        yCat = var2;
        xMax = d4.max(happydata, function(d) { return d[xCat]; });
        xMin = d4.min(happydata, function(d) { return d[xCat]; });
        yMax = d4.max(happydata, function(d) { return d[yCat]; });
        yMin = d4.min(happydata, function(d) { return d[yCat]; });

        set_limits_axes(x, y, xCat, yCat);

        // update data
        zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));
        zoomBeh.y(y.domain([yMin, yMax])).x(x.domain([xMin, xMax]));
        var svg = d4.select("#scatter").transition();
        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);
        svg.select(".y.axis").duration(750).call(yAxis).select(".label").text(yCat);
        objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
    }

    function zoom() {
        svg.select(".x.axis").call(xAxis);
        svg.select(".y.axis").call(yAxis);
        svg.selectAll(".dot")
        .attr("transform", transform);
    }

    function transform(d) {
        return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
    }
}

// update scatter plot when time slider is changed
function update_scatter_years(year) {
    // change visible variable
    happydata.forEach(function (d) {
        if (d["year"] == year) {
            d.visible = true;
        }
        else {
            d.visible = false;
        }
    });

    // hide or show legend dot
    var legend = d4.select("#scatter_div").selectAll(".leg_dot");
    for (var i = 0; i < 9; i++){
        var id = legend[0][i]["id"];
        if (id.substr(id.length-4) == year) {
            d4.select("#" + id).style("visibility", "visible")
        }
        else{
            d4.select("#" + id).style("visibility", "hidden")
        }
    }

    // hide or show dots in scatter plot
    var dots = d4.select("#scatter_div").selectAll(".dot");
    change_visibility(dots);
}

function change_visibility(dots){
    dots.style("visibility", function(d) {
        if (d["visible"] == false){
            return "hidden";
        }
        else{
            return "visible";
        }
    });
}



