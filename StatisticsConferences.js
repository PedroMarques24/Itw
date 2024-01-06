$('document').ready(function () {
    const composedUri = "http://192.168.160.58/NBA/API/Conferences/";
    const ctx = document.getElementById('myChart2');
    const ctx2 = document.getElementById('myChartextra');
    
    var teamsData = [];
    var myLabels = [];
    var teamsData2 = [];
    var myLabels2 = [];

    // Instantiate and draw our chart, passing in some options.
    var pieChart = new Chart(ctx, {
        type: 'pie',
        title: 'olá',
        data: {
            labels: myLabels,
            datasets: [{
                label: 'Number of Teams',
                data: teamsData,
                backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'], // Adjust color as needed
                borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { align: 'start', font: { family: 'Open Sans' } },
                    title: {
                        display: true, text: ['Estatísticas Gerais', 'N.º de Equipas por Conferência da NBA, por tipo de Conferência'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
                    },
                }
            },
        }
    });
    var pieChart2 = new Chart(ctx2, {
        type: 'pie',
        title: 'olá',
        data: {
            labels: myLabels2,
            datasets: [{
                label: 'Number of Divisions',
                data: teamsData2,
                backgroundColor: ['yellow', 'green'], // Adjust color as needed
                borderColor: ['yellow', 'green'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    labels: { align: 'start', font: { family: 'Open Sans' } },
                    title: {
                        display: true, text: ['Estatísticas Gerais', 'N.º de Divisões por Conferência da NBA, por tipo de Conferência'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
                    },
                }
            },
        }
    });

    ajaxHelper(composedUri, 'GET')
        .done(async function (stats) {
            var records = stats.Records;
            
            for (let item of records) {
                var conferenceId = item.Id;
                pieChart.data.labels.push(item.Name);
                pieChart2.data.labels.push(item.Name);

                try {
                    let data = await ajaxHelper(composedUri + conferenceId, "GET");
                    pieChart.data.datasets[0].data.push(data.Teams.length);
                    pieChart2.data.datasets[0].data.push(data.Divisions.length);
                    pieChart.update();
                    pieChart2.update();
                } catch (error) {
                    console.error(error);
                }
            }
        });
});

//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        }
    });
}