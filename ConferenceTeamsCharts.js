$('document').ready(function () {
    const composedUri = "http://192.168.160.58/NBA/API/Conferences/";
    const ctx = document.getElementById('myChart2');

    var teamsData = [];
    
    var myLabels = [];

    // Instantiate and draw our chart, passing in some options.
    var pieChart = new Chart(ctx, {
        type: 'pie',
        title: 'olá',
        data: {
            labels: myLabels,
            datasets: [{
                label: 'Number of Teams',
                data: teamsData,
                backgroundColor: ['rgb(255, 99, 132)','rgb(54, 162, 235)'], // Adjust color as needed
                borderColor: ['rgb(255, 99, 132)','rgb(54, 162, 235)'],
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


    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned
        
        var records = stats.Records;
        $.each(records, function (index, item) {
            var conferenceId = item.Id;

            pieChart.data.labels.push(item.Name);
           
            //myLabels.push(item.Name)
            /*myData.push(item.Players);/** */

            ajaxHelper(composedUri + conferenceId, "GET").done(function(data) {
                //teamsData.push(data.Teams.length)
                pieChart.data.datasets[0].data.push(data.Teams.length)
                pieChart.update()
            })
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



/*



if (conferenceId === 1) {
                (function (id) {
                    ajaxHelper(composedUri + conferenceId, 'GET').done(function (data) {
                        console.log(data);
                        
                        var Teams = (data.Teams);
                        var NoTeamsA = Teams.length;
                        teamsData.push(NoTeamsA)
                        pieChart.data.datasets[0].data.push(NoTeamsA)
                        pieChart.update();
                        //console.log(NoTeamsA);
                        //console.log(1);
                    });
                })(conferenceId);
            } else {
                (function (id) {
                    ajaxHelper(composedUri + conferenceId, 'GET').done(function (data) {
                        //console.log(data);
                        
                        var Teams2 = (data.Teams);
                        var NoTeamsB = Teams2.length;
                        teamsData.push(NoTeamsB)
                        pieChart.data.datasets[0].data.push(NoTeamsB)
                        console.log(NoTeamsB + "!!!")
                        pieChart.update();
                        //pieChart.data.labels.push()
                        //console.log(NoTeamsB);
                        //console.log(2);
                        //console.log(teamsData)
                        
                    });
                })(conferenceId);
            }

*/