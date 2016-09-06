function Graph3D(divId, data, xColIndex, yColIndex) {
    this.divId = divId;

    this.graphData = [];
    for (var i = 0; i < data.classNum; i++) {
        var classData = {
            x: data.columnDataForEachClass[i][xColIndex],
            y: data.columnDataForEachClass[i][yColIndex],
            z: Array(data.columnDataForEachClass[i][xColIndex].length).fill(data.classArr[i]),
            mode: 'markers',
            type: 'scatter3d',
            name: data.classArr[i],
            text: Array.from(Array(data.rowNum).keys()).map(x=>data.classArr[i] + '-' + ++x),
            marker: { opacity: 0.5, size: 3 }
        };

        this.graphData.push(classData);
    }

    this.layout = {
        title: "[X]" + data.colNameArr[xColIndex] + " - [Y]" + data.colNameArr[yColIndex],
        xaxis: {
            title: data.colNameArr[xColIndex]
        },
        yaxis: {
            title: data.colNameArr[yColIndex]
        },
        scene: {
            camera: {
                eye: {
                    x: 0.2,
                    y: 0,
                    z: -2.5
                }
            },
            xaxis: {
                title: data.colNameArr[xColIndex],
                zeroline: false
            },
            yaxis: {
                title: data.colNameArr[yColIndex],
                zeroline: false
            },
            zaxis: {
                title: "Class",
                zeroline: false
            }
        }
    };
}

Graph3D.prototype.draw = function () {
    Plotly.newPlot(this.divId, this.graphData, this.layout);
}
