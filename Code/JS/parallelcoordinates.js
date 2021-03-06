/**
 * Name: Thirza Dado
 * Student number: 10492682
 * This JavaScript program contains functions to create parallel coordinates.
 */

// highlight line when click on map
function highlight_line(country_name){
    d3.select(country_name)
        .style("stroke", "#586674")
        .style("stroke-width", "2");
}

// unhighlight line when click on map
function unhighlight_line(country_name){
    d3.select(country_name)
        .style("stroke", "#b6bfc8")
        .style("stroke-width", "1");
}

// global function to draw paths
var pathFunction;

// add parallel coordinates
function add_graph(years) {

    // margins
    var margin = {top: 100, right: 100, bottom: 50, left: 10},
        width = 1300 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // x, y, dragging
    var x = d4.scale.ordinal().rangePoints([0, width], 1),
        y = {},
        dragging = {};

    // subtitle
    d4.select("#subtitle")
        .append("div")
        .attr("id", "sub2")
        .text("Happiness variables from European countries in " + years)
        .style("font-style","italic");


    // define svg
    var svg = d4.select("#graph_div").append("svg")
        .attr("id", "graph")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define line
    var line = d4.svg.line(),
        axis = d4.svg.axis().orient("left"),
        background,
        foreground;

    // select data per year
    var year_data = [];
    Object.values(happydata).forEach(function (d) {
        if (d["year"] == years) {
            year_data.push(d);
        }
    });

    // extract the list of dimensions and create a scale for each.
    x.domain(dimensions = d4.keys(happydata[0]).filter(function (d) {
        return d != "country" && d != "year" && (y[d] = d4.scale.linear()
            .domain(d4.extent(happydata, function (p) {
                return +p[d];
            }))
            .range([height, 0]));
    }));

    //add tooltip parallel coordinates
    var tip = d4.select("#graph_div")
        .append("div")
        .attr("class", "tooltipi")
        .style("position", "absolute")
        .style("visibility", "hidden");

    // add grey background lines for context
    background = svg.append("g")
        .attr("class", "background")
        .selectAll("path")
        .data(year_data)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function (d, i) {
            return year_data[i]["country"].replace(/\s/g, '');
        })
        .on("mouseover", function (d) {
            tip.html(d["country"]);
            return tip.style("visibility", "visible");})
        .on("mousemove", function () {
            return tip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");});

    // add blue foreground lines for focus
    foreground = svg.append("g")
        .attr("class", "foreground")
        .selectAll("path")
        .data(year_data)
        .enter().append("path")
        .attr("d", path)
        .attr("id", function (d, i) {
            return year_data[i]["country"].replace(/\s/g, '');
        })
        .on("mouseover", function (d) {
            tip.html(d["country"]);
            return tip.style("visibility", "visible");})
        .on("mousemove", function () {
            return tip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");});

    // add a group element for each dimension
    var g = svg.selectAll(".dimension")
        .data(dimensions)
        .enter().append("g")
        .attr("class", "dimension")
        .attr("transform", function (d) {
            return "translate(" + x(d) + ")";
        })
        .call(d4.behavior.drag()
            .origin(function (d) {
                return {x: x(d)};
            })
            .on("dragstart", function (d) {
                dragging[d] = x(d);
                background.attr("visibility", "hidden");
            })
            .on("drag", function (d) {
                dragging[d] = Math.min(width, Math.max(0, d4.event.x));
                foreground.attr("d", path);
                dimensions.sort(function (a, b) {
                    return position(a) - position(b);
                });
                x.domain(dimensions);
                g.attr("transform", function (d) {
                    return "translate(" + position(d) + ")";
                })
            })
            .on("dragend", function (d) {
                delete dragging[d];
                transition(d4.select(this)).attr("transform", "translate(" + x(d) + ")");
                transition(foreground).attr("d", path);
                background
                    .attr("d", path)
                    .transition()
                    .delay(500)
                    .duration(0)
                    .attr("visibility", null);
            }));

    // add an axis and title
    g.append("g")
        .attr("class", "axis")
        .each(function (d) {
            d4.select(this).call(axis.scale(y[d]));
        })
        .append("text")
        .style("text-anchor", "left")
        .attr("y", -9)
        .text(function (d) {
            return d;
        })
        .attr("transform", "rotate(-30)");

    // add and store a brush for each axis
    g.append("g")
        .attr("class", "brush")
        .each(function (d) {
            d4.select(this).call(y[d].brush = d4.svg.brush().y(y[d]).on("brushstart", brushstart).on("brush", brush));
        })
        .selectAll("rect")
        .attr("x", -8)
        .attr("width", 16);


    function position(d) {
        var v = dragging[d];
        return v == null ? x(d) : v;
    }

    function transition(g) {
        return g.transition().duration(800);
    }

    // returns the path for a given data point
    function path(d) {
        return line(dimensions.map(function(p) { return [position(p), y[p](d[p])]; }));
    }

    pathFunction = path;

    function brushstart() {
        d4.event.sourceEvent.stopPropagation();
    }

    // handles a brush event, toggling the display of foreground lines
    function brush() {
        var actives = dimensions.filter(function (p) {
                return !y[p].brush.empty();
            }),
            extents = actives.map(function (p) {
                return y[p].brush.extent();
            });
        foreground.style("display", function (d) {
            return actives.every(function (p, i) {
                return extents[i][0] <= d[p] && d[p] <= extents[i][1];
            }) ? null : "none";
        });
    }
}

// update parallel coordinates
function update_graph(years) {

    // subtitle
    d4.select("#sub2").remove();

    //add tooltip parallel coordinates
    var tip = d4.select("#graph_div")
        .append("div")
        .attr("class", "tooltipi")
        .style("position", "absolute")
        .style("visibility", "hidden");

    d4.select("#subtitle")
        .append("div")
        .attr("id", "sub2")
        .text("Happiness variables from European countries in " + years)
        .style("font-style","italic");

    if (arr2.length > 0){
        arr2.forEach(function(d){
            unhighlight_line(d);
        })
    }

    // select data per year
    var year_data = [];

    Object.values(happydata).forEach(function (d) {
        if (d["year"] == years) {
            year_data.push(d);
        }
    });

    // select lines
    var update_1 = d3.select("#graph")
        .select("g.foreground")
        .selectAll("path")
        .data(year_data);

    var update_2 = d3.select("#graph")
        .select("g.background")
        .selectAll("path")
        .data(year_data);

    console.log(year_data);

    update_1.exit().remove();
    update_2.exit().remove();

    update_1.attr("id", function (d, i) {
            console.log(year_data[i]["country"].replace(/\s/g, ''));
            return year_data[i]["country"].replace(/\s/g, '');
        })
        .on("mouseover", function (d) {
                tip.html(d["country"]);
				return tip.style("visibility", "visible");})
        .on("mousemove", function () {
            return tip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");});

    update_2.attr("id", function (d, i) {
            console.log(year_data[i]["country"].replace(/\s/g, ''));
            return year_data[i]["country"].replace(/\s/g, '');
        })
        .on("mouseover", function (d) {
                tip.html(d["country"]);
				return tip.style("visibility", "visible");})
        .on("mousemove", function () {
            return tip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");})
        .on("mouseout", function () {
            return tip.style("visibility", "hidden");});

    // append paths
    var enter_1 = update_1.enter()
        .append("path");
    var enter_2 = update_2.enter()
        .append("path");

    update_1.merge(enter_1).transition().duration(800).attr("d", pathFunction);
    update_2.merge(enter_2).transition().duration(800).attr("d", pathFunction);

    if (arr2.length > 0){
        arr2.forEach(function(d){
            highlight_line(d);
        })
    }
}


