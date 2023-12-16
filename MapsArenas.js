$("document").ready(function () {
    var map = L.map('map', {
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        }
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var urlParams = new URLSearchParams(window.location.search);
    var arenaId = urlParams.get('id');

    if (arenaId) {
        var baseUri = "http://192.168.160.58/NBA/API/Arenas/";
        var composedUri = baseUri + arenaId;
    ajaxHelper(composedUri, 'GET')
        .done(function (data) {
            console.log(data);
                L.marker([data.Lat,data.Lon]).addTo(map)
                    .bindPopup('<img src="' + data.Photo + '" alt="Arena Photo" style="max-width:100%; max-height:100%;">' + '<br>'+ data.Name + '<br>' + data.StateName + " [" + data.StateId + "]<br><a class=\"text-dark text-decoration-none\" href =\"./arenaDetails.html?id=" + data.Id+"\"><span class=\"text-danger\">&rarr;</span> Arena Details</a>",{ minWidth: 150 } );
            
                    map.setView([data.Lat, data.Lon], 17);    });
        }});

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


