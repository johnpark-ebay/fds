$(document).ready(function () {
    var graphData = new GraphData(mockupColumnNames, mockupData, 20);

    var g1 = new Graph2D("divGraph2D", graphData, 4, 1);
    g1.draw();

    var g2 = new Graph3D("divGraph3D", graphData, 2, 1);
    g2.draw();
});
