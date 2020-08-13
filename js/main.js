const width = 500;
const height = 400;




    

const datasetURL = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

function getData(error, data) {
    console.log(data)
}

d3.json(datasetURL).then(res =>{
    const dataset = res.data;

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    svg.selectAll("rect")
        .data(dataset)
        .enter().append("rect")
        .attr("x", (d, i) => i)
        .attr("y", d => height - d[1])
        .attr("width", 1)
        .attr("height", d => d[1])
        .attr("fill", "navy");
});
