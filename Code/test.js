// create svg
var svg = d3.select("svg"),
    margin = {right: 50, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height");

// set scale
var x = d3.scaleLinear()
    .domain(["2006", "2015"])
    .range([0, width])
    .clamp(true);

// create slider
var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");

// slider line
slider.append("line")
    .attr("class", "track")
    .attr("x1", x.range()[0])
    .attr("x2", x.range()[1])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call(d3.drag()
    .on("start.interrupt", function() { slider.interrupt(); })
    .on("start drag", function() {
        hue(x.invert(d3.event.x));
        // console.log();
    }));

// slider ticks
slider.insert("g", ".track-overlay")
    .attr("class", "ticks")
    .attr("transform", "translate(0," + 18 + ")")
    .selectAll("text")
    .data(x.ticks(10))
    .enter().append("text")
    .attr("x", x)
    .attr("text-anchor", "middle")
    .text(function(d) { return d; });

// slider handle
var handle = slider.insert("circle", ".track-overlay")
    .attr("class", "handle")
    .attr("r", 9);


// slider.transition() // Gratuitous intro!
//     .duration(750)
//     .tween("hue", function() {
//       var i = d3.interpolate(0, 70);
//       return function(t) { hue(i(t)); };
//     });

function hue(h) {
    handle.attr("cx", x(h));
    console.log(h);
    return h;
}