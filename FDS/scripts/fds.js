var resource = resource2;

$(document).ready(function () {
    $().button('toggle'); // bootstrap radio buttons toggle

    $('#selector_rules').on('click', function () { showColumnImportance(resource.columnImportanceByRule) });
    $('#selector_human').on('click', function () { showColumnImportance(resource.columnImportanceByHuman) });
    $('#selector_machine').on('click', function () { showColumnImportance(resource.columnImportanceByMachine) });

    $('#btn_showGraph').on('click', showGraphs);
});

function showColumnImportance(columnImportance) {
    var $tbody = $('#tbody_colums');
    $tbody.empty();

    for (var i = 0; i <= resource.columnNames.length / 5; i++) {
        $tbody.append("<tr></tr>");
        var $lastTr = $tbody.children().last();

        if (i == 0) {
            for (var j = 0; j < 5 && j < resource.columnNames.length ; j++) {
                $lastTr.append("<td>" + resource.columnNames[j] + "</td>");
                $lastTr.append("<td>" + columnImportance[j] + "</td>");
            }
        }
        else {
            for (var colIndex = i * 5; colIndex < (i + 1) * 5 && colIndex <= resource.columnNames.length ; colIndex++) {
                if (columnImportance[colIndex] != undefined) {
                    $lastTr.append("<td>" + resource.columnNames[colIndex] + "</td>");
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
            classColIndex = resource.CLASS_COL_INDEX_RULE;
            columnImportance = resource.columnImportanceByRule;
            break;
        case 1:
            classColIndex = resource.CLASS_COL_INDEX_HUMAN;
            columnImportance = resource.columnImportanceByHuman;
            break;
        case 2:
            classColIndex = resource.CLASS_COL_INDEX_MACHINE;
            columnImportance = resource.columnImportanceByMachine;
            break;
    }

    var graphData = new GraphData(resource.columnNames, resource.data, classColIndex);

    var topPairs = getImportantPairs(columnImportance, topNum);
    $('#div_graphs_top').empty();

    for (var i = 0; i < topPairs.length; i++) {
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

    for (var i = 0; i < bottomPairs.length; i++) {
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
    var result = [];
    var current = [];

    var tempImportanceArr = importanceArr.slice();
    var index = tempImportanceArr.indexOf(Math.max.apply(null, tempImportanceArr));

    while (index > -1 && tempImportanceArr[index] != -Infinity && result.length < num) {
        current.push(index);
        tempImportanceArr[index] = -Infinity;
        if (current.length == 2) {
            result.push(current);
            current = [];
        }
        index = tempImportanceArr.indexOf(Math.max.apply(null, tempImportanceArr));
    }

    return result;
}

function getUnimportantPairs(importanceArr, num) {
    var result = [];
    var current = [];

    var tempImportanceArr = importanceArr.slice();
    var index = tempImportanceArr.indexOf(Math.min.apply(null, tempImportanceArr));

    while (index > -1 && tempImportanceArr[index] != Infinity && result.length < num) {
        current.push(index);
        tempImportanceArr[index] = Infinity;
        if (current.length == 2) {
            result.push(current);
            current = [];
        }
        index = tempImportanceArr.indexOf(Math.min.apply(null, tempImportanceArr));
    }

    return result;
}
