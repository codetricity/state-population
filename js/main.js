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

const circle = svg.append('circle')
  .attr('cx', '25')
  .attr('cy', '100')
  .attr('r', '25');


circle
  .transition()
  .attr('cx', '275')
  .duration(3000);

d3.csv('data/20-state-sample.csv').then((data) => {
  createYAxis(data);
});


function createYAxis(data) {
  const populationMinMax = getMaxMin(data);
  const yScale = d3.scaleLinear()
    .domain(populationMinMax)
    .range([height, 0]);
  const yAxis = d3.axisLeft(yScale);
  svg.append('g')
    .call(yAxis);
}

function createXAxis(data) {
  const xScale = d3.scaleBand
}


function getMaxMin(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].population = +data[i].population;
  }
  const maxPopulation = d3.max(data, (d) => {
    return d.population;
  });

  const minPopulation = d3.min(data, d => d.population)

  return [minPopulation, maxPopulation];
}
