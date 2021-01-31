//The color of each hexagon

var colors = ["#122a2d",
    "#455d61",
    "#16697A",
    "#23679A",
    "#758dc5",
    "#A9D6E5",
    "#89C2D9",
    "#61A5C2",
    "#2C7DA0",
    "#2A6F97",
    "#23679A",
    "#013A63",
    "#122a2d",
    "#455d61",
    "#16697A",
    "#23679A",
    "#a1bacb",
    "#c1a4c2",
    "#815d9d",
    "#6c3c6e"]
var color = [
    "#E9FF63",

    //"https://nchikurova.github.io/portfolio/data/airbnb.png",
    //"../data/airbnb.png",
    "#7DFF63", "#63F8FF", "#99FF63", "#CFFE63", "#FFC263", "#FFC763", "#FF8E63"
    , "#FF6464", "#FF7563", "#FF7F63", "#FFE963", "#E3FF63", "#FFD963", "#FFE263"]




///////////////////////////////////////////////////////////////////////////
////////////// Initiate SVG and create hexagon centers ////////////////////
///////////////////////////////////////////////////////////////////////////

//Function to call when you mouseover a node
function mover(d) {
    var el = d3.select(this)
        .transition()
        .duration(10)
        .style("fill-opacity", 0.3)
        ;
}

//Mouseout function
function mout(d) {
    var el = d3.select(this)
        .transition()
        .duration(1000)
        .style("fill-opacity", 1)
        ;
};

//svg sizes and margins
var margin = {
    top: 200,
    right: 20,
    bottom: 20,
    left: 200
};

var width = 850;
var height = 650;

//The number of columns and rows of the heatmap
var MapColumns = 5,
    MapRows = 3;

//The maximum radius the hexagons can have to still fit the screen
var hexRadius = d3.min([width / ((MapColumns + 0.6) * Math.sqrt(3)),
height / ((MapRows + 1 / 3)) * 1.8]);

//Set the new height and width of the SVG based on the max possible
width = MapColumns * hexRadius * Math.sqrt(3);
heigth = MapRows * 1.5 * hexRadius + 0.5 * hexRadius;

//Set the hexagon radius
var hexbin = d3.hexbin()
    .radius(hexRadius);

//Calculate the center positions of each hexagon	
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

///////////////////////////////////////////////////////////////////////////
////////////////////// Draw hexagons and color them ///////////////////////
///////////////////////////////////////////////////////////////////////////

//Start drawing the hexagons
svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
        return "M" + d.x + "," + d.y + hexbin.hexagon();
    })
    .attr("stroke", function (d, i) {
        return "#fff";
    })
    .attr("stroke-width", "1px")
    //.append("image")
    //.attr("xlink:href", "https://nchikurova.github.io/portfolio/data/airbnb.png")

    .attr('width', 200)
    .attr('height', 200)
    .style("fill", function (d, i) {
        return colors[i];
    }).style('opacity', 0.8)
    // .attr("xlink:href", "https://nchikurova.github.io/portfolio/data/airbnb.png")
    .on("mouseover", mover)
    .on("mouseout", mout)
    ;
