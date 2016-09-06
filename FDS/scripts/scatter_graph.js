function ScatterGraph(divId, data, xColIndex, yColIndex) {
    this.divId = divId;

    this.graphData = [];
    for (var i = 0; i < data.classArr.length; i++) {
        var classData = {
            x: data.columnData[xColIndex],
            y: data.columnData[yColIndex],
            mode: 'markers',
            type: 'scatter',
            name: data.classArr[i],
            text: Array.from(Array(data.rowNum).keys()).map(x=>data.classArr[i] + '-' + ++x),
            marker: { size: 12 }
        };

        graphData.push(classData);
    }

    this.layout = {
        title: data.colNameArr[xColIndex] + " - " + data.colNameArr[yColIndex]
    };
}

ScatterGraph.prototype.draw = function () {
    Plotly.newPlot(this.divId, this.graphData, this.layout);
}
