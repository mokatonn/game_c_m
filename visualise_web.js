const defaultOptions = {
    playerColor: {
        MKT: 'yellow',
        CVPI: 'blue'
    }
}

const defaultCharacters = [
    {
        position: { x: 4, y: 6 },
        player: 'CVPI',
        type: 'Villager'
    },
    {
        position: { x: 4, y: 7 },
        player: 'MKT',
        type: 'Sumo'
    },
    {
        position: { x: 9, y: 3 },
        player: 'CVPI',
        type: 'Witch'
    },
]

/*const defaultMovements = [
    { x: 3, y: 5, type: 'movement' },
    { x: 4, y: 5, type: 'movement' },
    { x: 5, y: 5, type: 'movement' },
    { x: 3, y: 6, type: 'movement' },
    { x: 5, y: 6, type: 'movement' },
    { x: 3, y: 7, type: 'movement' },
    { x: 4, y: 7, type: 'attack' },
    { x: 5, y: 7, type: 'movement' }
]*/
const defaultMovements = [
    { x: 0, y: 0, type: 'movement' }
]

function plot_web_topology(matrix, characters = defaultCharacters, movements = defaultMovements, options = defaultOptions){


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
    .range(["green", "blue", "brown", "black", "red"]);

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

const cellWidth = x(1)
const cellHeight = y(1)

movements.forEach(({ x: cy, y: cx, type }) => {
    const color = type === 'movement' ? 'white' : 'red'
    svg.append('circle')
        .attr('fill', color)
        .attr('opacity', .3)
        .attr('r', cellWidth/2)
        .attr('cx', x(cx) + cellWidth / 2)
        .attr('cy', y(cy) + cellHeight / 2)
})
characters.forEach(character => {
    const {
        position,
        type,
        player
    } = character
    const cx = x(position.y)
    const cy = y(position.x)
    const node = type === 'Villager' ? svg.append('circle').attr('r', cellWidth/4).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2)
        : type === 'Sumo' ? svg.append('circle').attr('r', cellWidth/3).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2).attr('stroke-dasharray', '1,2')
        : type === 'Knight' ? svg.append('ellipse').attr('rx', cellWidth /2).attr('ry', cellWidth/4).attr('cx', cx + cellWidth / 2).attr('cy', cy + cellHeight / 2).attr('stroke-dasharray', '1,2')
        : type === 'Witch' ? svg.append('path').attr('d', `M${cx+cellWidth/2},${cy + 5}l${cellWidth/2 - 2.5},${cellHeight - 10}h-${cellWidth - 5}Z`)
        : svg.append('rect').attr('x', cx - 5).attr('y', cy - 5).attr('width', 10).attr('height', 10)

    node.attr('fill', options.playerColor[player]).on('click', () => console.log(character))
})
}
