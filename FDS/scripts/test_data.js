function TestData(colNameArr, rowData, classColIndex) {
    this.colNameArr = colNameArr;
    this.rowData = rowData;
    this.rowNum = rowData.length;

    this.classArr = undefined;
    this.columnData = undefined;

    this.setcolumnData(classColIndex);
}

TestData.prototype.setcolumnData = function (classColIndex) {
    // Ŭ������ ����, classArr ����.
    // column data �� �̾Ƽ� this.columnData �� class �� ��ŭ�� �迭 ����.
}
