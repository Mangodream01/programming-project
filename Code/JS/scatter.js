
function scatter(var1, var2) {

    d3.select("#scatter").remove();
    d3.select("#scatter_div").append("div").attr("id", "scatter");

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


    // select data per year
    var year_data = [];
    var checked_years = checkbox();
    checked_years.forEach(function(checked_year){
        Object.values(happydata).forEach(function (d) {
            if (d["year"] == checked_year) {
                year_data.push(d);
            }
        });
    });

    // select data
    year_data.forEach(function (d) {
        d[var1] = +d[var1];
        d[var2] = +d[var2]
    });



    var xMax = d4.max(year_data, function(d) {
        return d[xCat];
    }) * 1.05,
        xMin = d4.min(year_data, function(d) {
            return d[xCat];
        }),
        xMin = xMin > 0 ? 0 : xMin,
        yMax = d4.max(year_data,
            function(d) {
            return d[yCat];
        }) * 1.05,
            yMin = d4.min(year_data, function(d) {
                return d[yCat];
            }),
                yMin = yMin > 0 ? 0 : yMin;

    x.domain([xMin, xMax]);
    y.domain([yMin, yMax]);

    var xAxis = d4.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d4.svg.axis()
        .scale(y)
        .orient("left")
        .tickSize(-width);

    var color = d4.scale.category10();

    var tip = d4.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
        return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
    });

    var zoomBeh = d4.behavior.zoom()
        .x(x)
        .y(y)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    var svg = d4.select("#scatter")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh);

    // svg.call(tip);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height);

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

    objects.selectAll(".dot")
        .data(year_data)
        .enter().append("circle")
        .classed("dot", true)
        .attr("id", function(d){
            return d["country"] + "_" + d["year"];
        })
        .attr("r",  5)
        .attr("transform", transform)
        .style("fill", function(d) {
            return color(d[colorCat]); });
        // .on("mouseover", tip.show)
        // .on("mouseout", tip.hide);

    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .classed("legend", true)
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("circle")
        .attr("r", 3.5)
        .attr("cx", width + 20)
        .attr("fill", color);

    legend.append("text")
        .attr("x", width + 26)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

    d4.select("input").on("click", change);

    function change() {
        xCat = "Confidence in national government";
        xMax = d4.max(data, function(d) { return d[xCat]; });
        xMin = d4.min(data, function(d) { return d[xCat]; });

        zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));
        var svg = d4.select("#scatter").transition();
        svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);
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


// function update_scatter(var1, var2){
//
//     d3.select(#scatter)
//
// }












