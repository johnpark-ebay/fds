﻿function Graph2D(divId, data, xColIndex, yColIndex) {
    this.divId = divId;

    this.graphData = [];
    for (var i = 0; i < data.classNum; i++) {
        var classData = {
            x: data.columnDataForEachClass[i][xColIndex],
            y: data.columnDataForEachClass[i][yColIndex],
            mode: 'markers',
            type: 'scatter',
            name: data.classArr[i],
            text: Array.from(Array(data.rowNum).keys()).map(x=>data.classArr[i] + '-' + ++x),
            marker: { size: 5 }
        };

        this.graphData.push(classData);
    }

    this.layout = {
        title: "[X]" + data.colNameArr[xColIndex] + " - [Y]" + data.colNameArr[yColIndex],
        xaxis: {
            title: data.colNameArr[xColIndex],
            zeroline: false
        },
        yaxis: {
            title: data.colNameArr[yColIndex],
            zeroline: false
        }
    };
}

Graph2D.prototype.draw = function () {
    Plotly.newPlot(this.divId, this.graphData, this.layout);
}