$(document).ready(function () {
    var testData = new TestData(mockupColumnNames, mockupData, 21);

    var g1 = new ScatterGraph("divGraphs", testData, 0, 1);
    g1.draw();
});