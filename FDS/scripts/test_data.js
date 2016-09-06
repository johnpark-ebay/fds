function TestData(colNameArr, rowData, classColIndex) {
    this.colNameArr = colNameArr;
    this.colNum = colNameArr.length;
    this.rowData = rowData;
    this.rowNum = rowData.length;

    this.classArr = undefined;
    this.classNum = undefined;
    this.columnData = undefined;

    this.setcolumnData(classColIndex);
}

TestData.prototype.setcolumnData = function (classColIndex) {
    this.classArr = Array.from(new Set(mockupData.map(row => row[classColIndex])));
    this.classNum = this.classArr.length;

    this.columnData = [];
    for (var i = 0; i < this.classNum; i++) {
        var rows = mockupData.filter(row => row[classColIndex] == this.classArr[i]);

        var currentClassColumnArr = [];
        for (var j = 0; j < this.colNum; j++) {
            currentClassColumnArr.push(rows.map(row=>row[j]));
        }
        this.columnData.push(currentClassColumnArr);
    }
}
