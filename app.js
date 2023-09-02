/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// Data and Dimensions
const DATA_URL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

const WIDTH = 800;
const HEIGHT = 400;
const MARGIN = { top: 20, right: 20, bottom: 50, left: 60 }

// Create the svg container
const svg = d3.select('#chart')
    .append('svg')
    .attr('width', WIDTH + MARGIN.left + MARGIN.right)
    .attr('height', HEIGHT + MARGIN.top + MARGIN.bottom)
    .style("background", "#f1efef")

// Fetch Data
d3.json(DATA_URL).then(data => {
    // Format Data
    const dates = data.data.map(d => new Date(d[0]))
    const GDP = data.data.map(d => d[1])

    // Create Scales
    const xScale = d3.scaleTime()
        .domain([d3.min(dates), d3.max(dates)])
        .range([0, WIDTH])

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(GDP)])
        .range([HEIGHT, 0])

    // Create Axes
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)

    // Append Axes
    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', `translate(${MARGIN.left}, ${HEIGHT + MARGIN.top})`)
        .call(xAxis)

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`)
        .call(yAxis)

    // Create Tooltip
    // const tooltip = d3.select('#chart')
    //     .append('div')
    //     .attr('id', 'tooltip')
    //     .style('opacity', 0)
    
    // Create Bars
    svg.selectAll('rect')
        .data(data.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('data-gdp', d => d[1])
        .attr('data-date', d => d[0])
        .attr('x', (d, i) => xScale(dates[i]) + MARGIN.left)
        .attr('y', d => yScale(d[1]) + MARGIN.top)
        .attr('width', WIDTH / dates.length)
        .attr('height', d => HEIGHT - yScale(d[1]))
        .attr('fill', '#2d4059')
        .on('mouseover', (d, i) => {
            d3.select('#tooltip')
                .style('opacity', 1)
                .style('left', `${d3.event.pageX + 20}px`)
                .style('top', `${d3.event.pageY}px`)
                .attr('data-date', d[0])
                .html(`
                    <p>${d[0]}</p>
                    <p>$${d[1]} Billion</p>
                `)
        }
    )
        .on('mouseout', () => {
            d3.select('#tooltip')
                .style('opacity', 0)
        }
    )
})


