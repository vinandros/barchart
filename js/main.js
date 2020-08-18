const datasetURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

d3.json(datasetURL).then(res =>{
    //define svg size
    const width = 800;
    const height = 400;
    const padding ={
        left:40,
        bottom:40,
        right:10,
        top:30
    };
    const barWidth = width/275;

    //get Data
    const dataset = res.data;

    //create Scales
    const max = d3.max(dataset, d => d[1]);
    
    const yScale = d3.scaleLinear()
    .domain([0, max]) 
    .range([height - padding.bottom, padding.top])

    const xScale = d3.scaleTime()
    .domain([new Date(d3.min(dataset, d => d[0])), new Date(d3.max(dataset, d => d[0]))])
    .range([padding.left * 2 , width + padding.right])

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", width + padding.left + padding.right )
                  .attr("height", height + padding.bottom + padding.left);

    const tooltip = d3.select("#tooltip")
    tooltip.style("opacity", 0);

    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")
        .attr("data-gdp", d => d[1])
        .attr("data-date", d => d[0])
        .attr("x", d => {
           return xScale(new Date(d[0])) 
        })
        .attr("y", d => {
            return yScale(d[1])
        })
        .attr("width", barWidth)
        .attr("height", (d) => (height - padding.bottom) - yScale(d[1]))
        .attr("id", (d, i) => {
            return "rect"+ i;
        })
        .attr("class", "bar")
        .attr("fill", "rgb(59, 151, 255)")
        .on('mouseover', function(d, i) {
            tooltip.html(d[0] + '<br>' + '$' + d[1].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion')
            .style("opacity", 0.9)
            .style("transition", "opacity 1s")
            .attr('data-date', d[0])
            .style("top", yScale(d[1]) + 100 +"px")
            .style("left", xScale(new Date(d[0]))+15+"px");
        })
        .on('mouseout', function(d, i) {
            tooltip.style("opacity", 0);
        });
        
    // Create Axis
    const xAxis = d3.axisBottom(xScale);

    svg.append("g")
        .attr("transform", "translate(0," + (height - padding.bottom) + ")")
        .attr("id","x-axis")
        .call(xAxis)

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("transform", "translate(" + padding.left *2 + ",0)")
        .attr("id","y-axis")
        .call(yAxis)

    svg.append('text')
        .attr('x', width/2 - 30)
        .attr('y', height + padding.bottom)
        .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
        .attr('class', 'info');

    svg.append('text')
        .attr('x', height/2 - padding.bottom - padding.top - 40)
        .attr('y', width/2 - padding.left - padding.right - 20)
        .attr("transform", "translate("+ 400 +") rotate(90 15 10)")
        .text('Gross Domestic Product')
        .attr('class', 'info');
});