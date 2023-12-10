const composedUri = "http://192.168.160.58/NBA/api/Statistics/NumPlayersBySeason";

$('document').ready(function () {
    const ctx = document.getElementById('myChart');

    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned
        var myLabels = [];
        var myData = [];
        var regularSeasonData = [];
        var playoffData = [];
        $.each(stats, function (index, item) {
            myLabels.push(item.Season);
            /*myData.push(item.Players);/** */
            if (item.SeasonType === 'Regular Season') {
                regularSeasonData.push(item.Players);
                playoffData.push(null);
            } else if (item.SeasonType === 'Playoffs') {
                playoffData.push(item.Players);
                regularSeasonData.push(null); 
            }    
        });


        // Instantiate and draw our chart, passing in some options.
        new Chart(ctx, {
            type: 'bar',
            title: 'olá',
            data: {
                labels: myLabels,
                datasets: [{
                    label: 'RegularSeason',
                    data: regularSeasonData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Adjust color as needed
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }, {
                    label: 'Playoff',
                    data: playoffData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Adjust color as needed
                    borderColor: 'rgba(255, 99, 132, 1)', // Adjust color as needed
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
                            display: true, text: ['Estatísticas Gerais', 'N.º de Jogadores por Season da NBA, por tipo de Season'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
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