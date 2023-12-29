$('document').ready(function () {
    const ctx = document.getElementById('myChart3');
    const composedUri = "http://192.168.160.58/NBA/API/Positions/";

    var playersData = [];
    var myLabels = [];

        // Instantiate and draw our chart, passing in some options.
        var barChart = new Chart(ctx, {
            type: 'bar',
            title: 'Player Position Chart',
            data: {
                labels: myLabels,
                datasets: [{
                    label: 'Player Positions',
                    data: playersData,
                    backgroundColor: 'blue', // Adjust color as needed
                    borderColor: 'blue',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { align: 'start', font: { family: 'Open Sans' } },
                        title: {
                            display: true, text: ['Estatísticas Gerais', 'N.º de Jogadores por Posição na NBA'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
                        },
                    }
                },
                indexAxis: 'x',
                scales: {
                    x: {
                        ticks: {
                            font: { family: 'Open Sans', color: '#800',size: 10 } ,
                        }
                    },
                    y: {
                        beginAtZero: true, 
                        ticks: {
                            font: { family: 'Open Sans', color: '#800', size: 8, width: 200 } ,
                        }
                    }
                }
            }
        });

        ajaxHelper(composedUri, 'GET')
        .done(async function (stats) {
            var records = stats.Records;
            
            for (let item of records) {
                var positionID = item.Id;
                barChart.data.labels.push(item.Name);

                try {
                    let data = await ajaxHelper(composedUri + positionID, "GET");
                    barChart.data.datasets[0].data.push(data.Players.length);
                    barChart.update();
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