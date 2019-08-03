const margin = { top: 50, right: 200, bottom: 30, left: 70 };

const $chart = d3.select('#vis');
const $svg = $chart.append('svg').attr('id','chartarea');
const $svg1 = d3.select('#chartarea')
var $plot = $svg1.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
const parseDate = d3.timeParse('%Y');

// set up scales
const x = d3.scaleTime();
const y = d3.scaleLinear();
const colour = d3.scaleOrdinal(d3.schemeCategory10);

const xAxis = d3.axisBottom()
  .scale(x)
  .ticks(5);

const yAxis = d3.axisLeft()
  .scale(y)
  .ticks(10);

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.value))
  .curve(d3.curveMonotoneX);


function render() {

  const width = parseInt($chart.node().offsetWidth) - margin.left - margin.right;
  const height = parseInt(width * 0.6) - margin.top - margin.bottom;

  $svg1.attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  x.range([0, width]);
  y.range([height, 0]);

  $plot.select('.axis.x')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .select('.domain').remove();

  $plot.select('.axis.y')
    .call(yAxis)
    .call(g => g.select('.tick:last-of-type text').clone()
      .attr('x', 3)
      .attr('text-anchor', 'start')
      .attr('font-weight', 600)
      .text('$ Dollars'))
    .select('.domain').remove();

  $plot.select('.baseline')
    .attr('x1', 0)
    .attr('x2', width)
    .attr('y1', y(0))
    .attr('y2', y(0))
    .attr('fill', 'none')
    .attr('stroke', '#000')
    .attr('stroke-width', '1px')
    .attr('shape-rendering', 'crispEdges')
    .attr('stroke-dasharray', '3, 3')

  delete path; delete sel;
  const path = $plot.selectAll('path')
    .attr('d', d => line(d.values))
    .attr('stroke', d => colour(d.name))
    .attr('opacity', d => d.name == $state ? 1 : 0.9)
	  .attr('id', (d, i) => `line-${d.name}`);
  

  path.each((d, i) => {
	const sel = d3.select(`#line-${$state}`);
  //console.log(sel);
	const length = sel.node().getTotalLength();
    sel.attr('stroke-dasharray', `${length} ${length}`)
      .attr('stroke-dashoffset', length)
      .transition()
        .duration(5000)
        .attr('stroke-dashoffset', 0)
  });


  $plot.selectAll('.line-label')
    .attr('transform', d => {
      return `translate(${x(d.value.date)}, ${y(d.value.value)})`;
    })
    .attr('x', 5)
    .attr('dy', '.35em')
    .attr('fill', d => colour(d.name))
    .attr('font-weight', d => d.name == $state ? 700 : 400)
    .text(d => d.name)
    .attr('opacity', 0)
    .transition()
      .delay(4000)
      .duration(200)
      .attr('opacity', 1)
	  
	  
   // ADD TIMEFRAME
    var timeframe = {
    	    RangeStart: parseDate(2008),
			RangeEnd: parseDate(2009),
			Label: "Recession",
			Color: "#D3D3D3"
    };
    
	
    var gTimeframe = $svg1.append("g").attr("class", "timeframe")
	    .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
    gTimeframe.append("rect")
      	.attr('x', x(timeframe.RangeStart))
      	.attr('y', 0)
        .attr('width', x(timeframe.RangeEnd) - x(timeframe.RangeStart))
        .attr('height', height)
        .style('fill', timeframe.Color)
		.style('opacity', ".5");
        
    gTimeframe.append("text")
    	.attr("x", x(timeframe.RangeStart) + 5)
      .attr("y", 15)
      .text(timeframe.Label);
    //end timeframe	  

}

function bindData(rawdata) {
  // column headings, for each line
  const keys = rawdata.columns.filter(key => key != 'year');

  rawdata.forEach(d => {
    d.year = parseDate(d.year);
  })
  const data = keys.map(name => {
    return {
      name,
      values: rawdata.map(d => {
        return {date: d.year, value: +d[name]};
      })
    }
  });

  colour.domain(keys);

  x.domain(d3.extent(rawdata, d => d.year));
  y.domain([00, d3.max(data, c => d3.max(c.values, v => v.value))
  ]).nice();

  // bind data to DOM elements
  const $lines = $plot.append('g')
    .attr('class', 'lines')
    .selectAll('.line')
    .data(data.filter(function(d){return d.name == $state;}))
    .enter()
    .append('g')
    .attr('class', 'line');
 

  $lines.append('path')
    .attr('class', 'path')

  $lines.append('text')
    .datum(d => {
      return {
        name: d.name,
        value: d.values[d.values.length - 1]
      }
    })
    .attr('class', 'line-label')
    .attr('opacity', 0)

  $plot.append('g')
    .attr('class', 'axis x');

  $plot.append('g')
    .attr('class', 'axis y');

  $plot.append('line')
    .attr('class', 'baseline')
  
  //window.addEventListener('resize', debounce(render, 200));
  render();
}

var $state = document.getElementById("opts").value;
d3.select('#opts')
  .on('change', function() {
    //d3.selectAll(".line").remove();

	  $state = document.getElementById("opts").value;
  
    d3.csv("states.csv").then(bindData);
});

d3.csv("states.csv").then(bindData);

//function init() { d3.csv(newData).then(bindData);}
//init();

