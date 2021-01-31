//The height of the total heatmap will be
num_rows * 3 / 2 * hexRadius + 1 / 2 * hexRadius
    //which is the same as
    (num_rows + 1 / 3) * 3 / 2 * hexRadius

//The width of the total heatmap will be
num_columns * Math.sqrt(3) * hexRadius + Math.sqrt(3) / 2 * hexRadius
    //which is the same as
    (num_columns + 1 / 2) * Math.sqrt(3) * hexRadius

//SVG sizes and margins
var margin = {
    top: 50,
    right: 20,
    bottom: 20,
    left: 50
},
    width = 850,
    height = 350;

//The number of columns and rows of the heatmap
var MapColumns = 30,
    MapRows = 20;

//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width / ((MapColumns + 0.5) * Math.sqrt(3)),
height / ((MapRows + 1 / 3) * 1.5)]);

//Calculate the center position of each hexagon
var points = [];
for (var i = 0; i < MapRows; i++) {
    for (var j = 0; j < MapColumns; j++) {
        var x = hexRadius * j * Math.sqrt(3)
        //Offset each uneven row by half of a "hex-width" to the right
        if (i % 2 === 1) x += (hexRadius * Math.sqrt(3)) / 2
        var y = hexRadius * i * 1.5
        points.push([x, y])
    }//for j
}//for i

//Create SVG element
var svg = d3.select("#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Set the hexagon radius
var hexbin = d3.hexbin().radius(hexRadius);

//Draw the hexagons
svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
        return "M" + d.x + "," + d.y + hexbin.hexagon();
    })
    .attr("stroke", "white")
    .attr("stroke-width", "1px")
    .style("fill", "teal");