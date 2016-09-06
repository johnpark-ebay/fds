$(document).ready(function () {
    var testData = new TestData(mockupColumnNames, mockupData, 20);

    var g1 = new ScatterGraph("divGraphs", testData, 4, 1);
    g1.draw();
});