function GraphData(colNameArr, resource, classColIndex) {
    this.colNameArr = colNameArr;
    this.colNum = colNameArr.length;
    this.rowData = resource;
    this.rowNum = resource.length;

    this.classArr = undefined;
    this.classNum = undefined;
    this.columnDataForEachClass = undefined;

    this.setcolumnData(classColIndex);

    this.typeNumArr = [];
    for (var i = 0; i < this.colNum; i++) {
        var columnSet = new Set(this.rowData.map(row => row[i]));
        this.typeNumArr.push(columnSet.size);
    }
}

GraphData.prototype.setcolumnData = function (classColIndex) {
    this.classArr = Array.from(new Set(this.rowData.map(row => row[classColIndex])));
    this.classNum = this.classArr.length;

    this.columnDataForEachClass = [];
    for (var i = 0; i < this.classNum; i++) {
        var rows = this.rowData.filter(row => row[classColIndex] == this.classArr[i]);

        var currentClassColumnArr = [];
        for (var j = 0; j < this.colNum; j++) {
            currentClassColumnArr.push(rows.map(row=>row[j]));
        }
        this.columnDataForEachClass.push(currentClassColumnArr);
    }
}

function Graph2D(divId, data, colIndexArr) {
    this.divId = divId;
    var xColIndex = colIndexArr[0];
    var yColIndex = colIndexArr[1];

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

function Graph3D(divId, data, colIndexArr) {
    this.divId = divId;
    var xColIndex = colIndexArr[0];
    var yColIndex = colIndexArr[1];

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
