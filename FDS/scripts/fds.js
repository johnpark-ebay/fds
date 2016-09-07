var columnNames = ["Status of checking account", "Duration in months", "Credit history", "Purpose", "Credit amount", "Savings account/bond", "Present employment since", "Installment rate in percentage of disposable income", "Personal status and sex", "Other debtors/guarantors", "Present residence since", "Property", "Age in years", "Other installment plans", "Housing", "Number of existing credits at this bank", "Job", "Number of people being liable to provide maintenance for", "Telephone", "Foreign worker", "Credit risk"];

var columnImportanceByRule = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var columnImportanceByHuman = [0, 18, 2, 3, 19, 6, 7, 10, 9, 11, 12, 5, 1, 14, 8, 15, 16, 17, 4, 13];
var columnImportanceByMachine = [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

var CLASS_COL_INDEX_RULE = 20;
var CLASS_COL_INDEX_HUMAN = 20;
var CLASS_COL_INDEX_MACHINE = 20;

$(document).ready(function () {
    $().button('toggle'); // bootstrap radio buttons toggle

    $('#selector_rules').on('click', function () { showColumnImportance(columnImportanceByRule) });
    $('#selector_human').on('click', function () { showColumnImportance(columnImportanceByHuman) });
    $('#selector_machine').on('click', function () { showColumnImportance(columnImportanceByMachine) });

    $('#btn_showGraph').on('click', showGraphs);
});

function showColumnImportance(columnImportance) {
    var $tbody = $('#tbody_colums');
    $tbody.empty();

    for (var i = 0; i <= columnNames.length / 5; i++) {
        $tbody.append("<tr></tr>");
        var $lastTr = $tbody.children().last();

        if (i == 0) {
            for (var j = 0; j < 5 && j < columnNames.length ; j++) {
                $lastTr.append("<td>" + columnNames[j] + "</td>");
                $lastTr.append("<td>" + columnImportance[j] + "</td>");
            }
        }
        else {
            for (var colIndex = i * 5; colIndex < (i + 1) * 5 && colIndex <= columnNames.length ; colIndex++) {
                if (columnImportance[colIndex] != undefined) {
                    $lastTr.append("<td>" + columnNames[colIndex] + "</td>");
                    $lastTr.append("<td>" + columnImportance[colIndex] + "</td>");
                }
            }
        }
    }
}

function showGraphs() {
    var topNum = $('#input_selectTopNum').val();
    var bottomNum = $('#input_selectBottomNum').val();
    var dimensionThreashold = $('#input_dimensionThreashold').val();
    var classifier = $('#div_classifier').find('label.active').index();
    var classColIndex = undefined;
    var columnImportance = undefined;

    switch (classifier) {
        case -1:
            alert("조회 기준이 선택 되지 않았습니다.");
            break;
        case 0:
            classColIndex = CLASS_COL_INDEX_RULE;
            columnImportance = columnImportanceByRule;
            break;
        case 1:
            classColIndex = CLASS_COL_INDEX_HUMAN;
            columnImportance = columnImportanceByHuman;
            break;
        case 2:
            classColIndex = CLASS_COL_INDEX_MACHINE;
            columnImportance = columnImportanceByMachine;
            break;
    }

    var graphData = new GraphData(columnNames, resource, classColIndex);

    var topPairs = getImportantPairs(columnImportance, topNum);
    $('#div_graphs_top').empty();

    for (var i = 0; i < topNum; i++) {
        var divId = "div_top_graph" + i;
        $('#div_graphs_top').append('<div id="' + divId + '" style="float: left; width: 480px; height: 480px;"></div>')
        if (graphData.typeNumArr[topPairs[i][0]] > dimensionThreashold && graphData.typeNumArr[topPairs[i][1]] > dimensionThreashold) {
            new Graph2D(divId, graphData, topPairs[i]).draw();
        }
        else {
            new Graph3D(divId, graphData, topPairs[i]).draw();
        }
    }

    var bottomPairs = getUnimportantPairs(columnImportance, bottomNum);
    $('#div_graphs_bottom').empty();

    for (var i = 0; i < topNum; i++) {
        var divId = "div_bottom_graph" + i;
        $('#div_graphs_bottom').append('<div id="' + divId + '" style="float: left; width: 480px; height: 480px;"></div>')
        if (graphData.typeNumArr[bottomPairs[i][0]] > dimensionThreashold && graphData.typeNumArr[bottomPairs[i][1]] > dimensionThreashold) {
            new Graph2D(divId, graphData, bottomPairs[i]).draw();
        }
        else {
            new Graph3D(divId, graphData, bottomPairs[i]).draw();
        }
    }
}

function getImportantPairs(importanceArr, num) {
    var min = Math.min.apply(null, importanceArr);
    var max = Math.max.apply(null, importanceArr);
    var cnt = 0;
    var result = [];
    var current = [];

    for (var i = max; i >= min && cnt < num; i--) {
        var index = importanceArr.indexOf(i);

        if (index != -1) {
            current.push(index);
            if (current.length == 2) {
                result.push(current);
                current = [];
                cnt++;
            }
        }
    }

    return result;
}

function getUnimportantPairs(importanceArr, num) {
    var min = Math.min.apply(null, importanceArr);
    var max = Math.max.apply(null, importanceArr);
    var cnt = 0;
    var result = [];
    var current = [];

    for (var i = min; i <= max && cnt < num; i++) {
        var index = importanceArr.indexOf(i);

        if (index != -1) {
            current.push(index);
            if (current.length == 2) {
                result.push(current);
                current = [];
                cnt++;
            }
        }
    }

    return result;
}
