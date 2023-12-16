$("document").ready(function () {
    var map = L.map('map', {
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    }).setView([37.8, -96], 4);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var composedUri = "http://192.168.160.58/NBA/API/Arenas";
    ajaxHelper(composedUri, 'GET')
        .done(function (data) {
            console.log(data);
            $.each(data.Records, function (index, record) {
                L.marker([record.Lat, record.Lon]).addTo(map)
                    .bindPopup('<img src="' + record.Photo + '" alt="Arena Photo" style="max-width:100%; max-height:100%;">' + '<br>'+ record.Name + '<br>' + record.StateName + " [" + record.StateId + "]<br><a class=\"text-dark text-decoration-none\" href =\"./arenaDetails.html?id=" + record.Id+"\"><span class=\"text-danger\">&rarr;</span> Arena Details</a>",{ minWidth: 150 } );
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


