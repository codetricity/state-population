// http://worldpopulationreview.com/states/california-population/
// http://worldpopulationreview.com/states/

const width = 600;
const height = 400;
const margin = { left: 100, right: 50, top: 50, bottom: 80 };
const svgWidth = width + margin.left + margin.right;
const svgHeight = height + margin.top + margin.bottom;

const svg = d3.select('body').append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
  .attr('transform', `translate( ${margin.left}, ${margin.top} )`);


d3.csv('data/10-state-sample.csv').then((data) => {
  const yScale = createYAxis(data);
  const xScale = createXAxis(data);
  plot(data, xScale, yScale);
});

function plot(data, xScale, yScale) {
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => {
      console.log(xScale('California'));
      return xScale(d.state);
    })
    .attr('cy', d => yScale(d.population))
    .attr('r', '5');
}


function createYAxis(data) {
  const populationMinMax = getMaxMin(data);
  const yScale = d3.scaleLinear()
    .domain(populationMinMax)
    .range([height, 0]);
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .call(yAxis);
  return yScale;
}

function createXAxis(data) {
  const states = [];

  data.forEach((d) => {
    states.push(d.state);
  });

  const xScale = d3.scaleBand()
    .domain(states)
    .range([0, width]);
  const xAxis = d3.axisBottom(xScale);
  svg.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('.tick')
    .remove()
    .selectAll('text')
    .remove();
    // .attr('text-anchor', 'end')
    // .attr('transform', 'rotate(-45)');
  for (let i = 0; i < states.length; i++) {
    svg.append('text')
      .text(states[i])
      .attr('x', i * 60)
      .attr('y', height + 20 )
      .attr('text-anchor', 'front')
      .attr('transform', `rotate(45, ${i * 60}, ${height + 20})`);
  }
  return xScale; 
}


function getMaxMin(data) {
  data.forEach((d) => {
    d.population = parseInt(d.population, 10); // eslint-disable-line no-param-reassign
  });

  const populationExtent = d3.extent(data, d => d.population);
  return populationExtent;
}


// function testCircle() {
//   const circle = svg.append('circle')
//     .attr('cx', '25')
//     .attr('cy', '100')
//     .attr('r', '25');
//   circle
//     .transition()
//     .attr('cx', '275')
//     .duration(3000);
// }
