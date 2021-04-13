// @TODO: YOUR CODE HERE!
// You need to create a scatter plot between two of the data variables such as `Healthcare vs. Poverty` or `Smokers vs. Age`

// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
// Import data from the data csv file
d3.csv("assets/data/data.csv").then(function(StateData) {
    console.log(StateData);
    console.log([StateData]);

  // sort through the data
  StateData.forEach(function(data) {
    data.abbr=+data.abbr;
    data.obesity=+data.obesity;
    data.income=+data.income;
  });
    
  // create scales
  // compare income levels vs obesity levels
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(StateData, d=> d.income)*.75,
      d3.max(StateData, d=> d.income)*1.25
    ])
    .range([0, width]);
  
  var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(StateData, d => d.obesity)*1.25])
      .range([height, 0]);

  // create initial axis function
  var bottomAxis = d3.axisBottom(xLinearScale).ticks(10);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", "translate(0, ${height})")
    .call(bottomAxis);
    
  // append y axis
  var yAxis = chartGroup.append("g")
    .call(leftAxis);
      
  // append circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(StateData)
    .enter()
    .append("circle")
    .attr("cx", d=> xLinearScale(d.income))
    .attr("cy", d=> yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "orange")
    .attr("opacity", ".4");

  // append state abbreviation to the circle corresponding to the state

  // append x axis label
  chartGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .classed("axis-text", true)
    .text("Income");

  // append y axis label
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Obesity");
    
});