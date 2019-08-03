const margin = { top: 50, right: 200, bottom: 30, left: 70 };

const $chart = d3.select('#vis');
const $svg = $chart.append('svg');
const $plot = $svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const parseDate = d3.timeParse('%m/%d/%Y');

// set up scales
const x = d3.scaleTime();
const y = d3.scaleLinear();

const colour = d3.scaleOrdinal(d3.schemeCategory10);

const xAxis = d3.axisBottom()
  .scale(x)
  .ticks(10);

const yAxis = d3.axisLeft()
  .scale(y)
  .ticks(10);

const line = d3.line()
  .x(d => x(d.date))
  .y(d => y(d.value))
  .curve(d3.curveCardinal);

	

function render() {

  const width = parseInt($chart.node().offsetWidth) - margin.left - margin.right;
  const height = parseInt(width * 0.6) - margin.top - margin.bottom;

  $svg.attr('width', width + margin.left + margin.right)
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
      .text('Yield Curve Index'))
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

    // ADD TIMEFRAME
var timeframes = [
 // {
 //   RangeStart: parseDate('4/1/1969'),
 //   RangeEnd: parseDate('10/1/1970'),
 //   Label: "Recession",
  //  Color: "#D3D3D3"
  //},
//  {
//    RangeStart: parseDate('10/1/1973'),
//    RangeEnd: parseDate('1/1/1975'),
//    Label: "Recession",
//    Color: "#D3D3D3"
//  },
  {
    RangeStart: parseDate('4/1/1979'),
    RangeEnd: parseDate('4/1/1980'),
    Label: "Recession",
    Color: "#D3D3D3"
  },
  {
    RangeStart: parseDate('4/1/1981'),
    RangeEnd: parseDate('4/1/1982'),
    Label: "Recession",
    Color: "#D3D3D3"
  },
  {
    RangeStart: parseDate('10/1/1989'),
    RangeEnd: parseDate('1/1/1991'),
    Label: "Recession",
    Color: "#D3D3D3"
  },
  {
    RangeStart: parseDate('1/1/2001'),
    RangeEnd: parseDate('7/1/2001'),
    Label: "Recession",
    Color: "#D3D3D3"
  },
  {
    RangeStart: parseDate('10/1/2007'),
    RangeEnd: parseDate('4/1/2009'),
    Label: "Recession",
    Color: "#D3D3D3"
  },


];

var gTimeframes = $svg
    .selectAll("g.timeframe")
  .data(timeframes).enter()
    .append("g").attr("class", "timeframe")
	.attr('transform', `translate(${margin.left}, ${margin.top})`);

gTimeframes.append("rect")
    .attr("x", function(d) { return x(d.RangeStart); })
    .attr("y", 0)
    .attr("width", function(d) { return x(d.RangeEnd) - x(d.RangeStart); })
    .attr("height", height)
    .style("fill", function(d) { return d.Color; })
	.style("opacity","0.5");

//gTimeframes.append("text")
//    .attr("x", function(d) { return x(d.RangeStart) + 5; })
//    .attr("y", 15)
//    .text(function(d) { return d.Label; });
    //end timeframe

 var tooltip = d3.selectAll(".timeframe")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .html("A dip in the index can be observed before ressions.")
      .style("left", (d3.mouse(this)[0]+70) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip.style("opacity", 0)
  }


  const path = $plot.selectAll('path')
    .attr('d', d => line(d.values))
    .attr('stroke', d => colour(d.name))
    .attr('opacity', d => d.name == 'yield_diff' ? 1 : 0.5)
    .attr('id', (d, i) => `line-${d.name}`)

  path.each((d, i) => {
    const sel = d3.select(`#line-${d.name}`);
    const length = sel.node().getTotalLength();

    sel.attr('stroke-dasharray', `${length} ${length}`)
      .attr('stroke-dashoffset', length)
      .transition()
        .duration(5000)
        .attr('stroke-dashoffset', 0)
  })

  $plot.selectAll('.line-label')
    .attr('transform', d => {
      return `translate(${x(d.value.date)}, ${y(d.value.value)})`;
    })
    .attr('x', 5)
    .attr('dy', '.35em')
    .attr('fill', d => colour(d.name))
    .attr('font-weight', d => d.name == 'yield_diff' ? 700 : 400)
    .text(d => d.name)
    .attr('opacity', 0)
    .transition()
      .delay(4000)
      .duration(200)
      .attr('opacity', 1)


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
  y.domain([-2, d3.max(data, c => d3.max(c.values, v => v.value))
  ]).nice();

  // bind data to DOM elements
  const $lines = $plot.append('g')
    .attr('class', 'lines')
    .selectAll('.line')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'line')

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
  
  window.addEventListener('resize', debounce(render, 200));
  render();
}

function init() {
  d3.csv('rdata.csv').then(bindData);
}

init();