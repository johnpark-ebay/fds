$(document).ready(function () {
    var graphData = new GraphData(mockupColumnNames, mockupData, 20);

    var g1 = new Graph3D("divGraphs", graphData, 0, 1);
    g1.draw();
});
