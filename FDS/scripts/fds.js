var columnNames = ["Status of checking account", "Duration in months", "Credit history", "Purpose", "Credit amount", "Savings account/bond", "Present employment since", "Installment rate in percentage of disposable income", "Personal status and sex", "Other debtors/guarantors", "Present residence since", "Property", "Age in years", "Other installment plans", "Housing", "Number of existing credits at this bank", "Job", "Number of people being liable to provide maintenance for", "Telephone", "Foreign worker", "Credit risk"];

var rule_column_importance = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
var human_column_importance = [0, 10, 2, 3, 13, 6, 7, 18, 9, 11, 12, 5, 1, 14, 8, 15, 16, 17, 4, 19];
var machine_column_importance = [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

$(document).ready(function () {
    $().button('toggle'); // bootstrap radio buttons toggle

    $('#selector_rules').on('click', function () { showColumnImportance(rule_column_importance) });
    $('#selector_human').on('click', function () { showColumnImportance(human_column_importance) });
    $('#selector_machine').on('click', function () { showColumnImportance(machine_column_importance) });

    var graphData = new GraphData(columnNames, mockupData, 20);
    /*
    new Graph3D("divGraph1", graphData, 0, 1).draw();
    new Graph3D("divGraph2", graphData, 2, 1).draw();
    new Graph2D("divGraph3", graphData, 3, 1).draw();
    new Graph2D("divGraph4", graphData, 4, 1).draw();
    new Graph3D("divGraph5", graphData, 5, 1).draw();
    new Graph3D("divGraph6", graphData, 1, 6).draw();
    */
});

function showColumnImportance(columnImportance) {
    var $tbody = $('#tbody_colums');
    $tbody.empty();

    for (var i = 0; i <= columnNames.length / 5; i++) {
        var $tr = $tbody.append("<tr></tr>");

        if (i == 0) {
            for (var j = 0; j < 5 && j < columnNames.length ; j++) {
                $tr.append("<td>" + columnNames[j] + "</td>");
                $tr.append("<td>" + columnImportance[j] + "</td>");
            }
        }
        else {
            for (var colIndex = i * 5; colIndex < (i + 1) * 5 && colIndex <= columnNames.length ; colIndex++) {
                if (columnImportance[colIndex] != undefined) {
                    $tr.append("<td>" + columnNames[colIndex] + "</td>");
                    $tr.append("<td>" + columnImportance[colIndex] + "</td>");
                }
            }
        }
    }
}
