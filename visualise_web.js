function plot_web_topology(matrix){


  // set the dimensions and margins of the graph
  var margin = {top: 30, right: 30, bottom: 30, left: 30},
    width = 450 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#mat_vis")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);

var x = d3.scale.ordinal()
    .domain(d3.range(size_map))
    .rangeBands([0, width]);

var y = d3.scale.ordinal()
    .domain(d3.range(size_map))
    .rangeBands([0, height]);

var colorMap = d3.scale.linear()
    .domain([0, 1, 2, 3, 100])
    .range(["green", "blue", "brown", "black", "yellow"]);

var row = svg.selectAll(".row")
    .data(matrix)
  .enter().append("g")
    .attr("class", "row")
    .attr("transform", function(d, i) { return "translate(0," + y(i) + ")"; });

row.selectAll(".cell")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) { return x(i); })
    .attr("width", x.rangeBand())
    .attr("height", y.rangeBand())
    .style("stroke-width", 0);

row.selectAll(".cell")
    .data(function(d, i) { return matrix[i]; })
    .style("fill", colorMap);


}
