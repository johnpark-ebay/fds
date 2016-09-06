function TestData(colNameArr, rowData, classColIndex) {
    this.colNameArr = colNameArr;
    this.rowData = rowData;
    this.rowNum = rowData.length;

    this.classArr = undefined;
    this.columnData = undefined;

    this.setcolumnData(classColIndex);
}

TestData.prototype.setcolumnData = function (classColIndex) {
    // 클래스로 구분, classArr 설정.
    // column data 를 뽑아서 this.columnData 에 class 수 만큼의 배열 설정.
}
