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
            hideLoading();
        }
    });

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}

function showLoading() {
    $("#myModal").modal('show', {
        backdrop: 'static',
        keyboard: false
    });
}
function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    })
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    console.log("sPageURL=", sPageURL);
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

    //--- start ....
    showLoading();
    var pg = getUrlParameter('page');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!")
};
function ArenaViewModel() {
    var self = this;


    // Example function
    self.activate = function (id) {
        console.log('CALL: getArenas...');
        var composedUri = self.baseUri() + "?page=" + id + "&pageSize=" + self.pagesize();
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.records(data.Records);
            self.currentPage(data.CurrentPage);
            self.hasNext(data.HasNext);
            self.hasPrevious(data.HasPrevious);
            self.pagesize(data.PageSize)
            self.totalPages(data.TotalPages);
            self.totalRecords(data.TotalRecords);
            self.SetFavourites();
            //self.SetFavourites();
        });
    };
}

// Instantiate the view model
var arenaViewModel = new ArenaViewModel();
//--- Page Events

function showLoading() {
    $("#myModal").modal('show', {
        keyboard: false
    });
}
function hideLoading() {
    $('#myModal').on('shown.bs.modal', function (e) {
        $("#myModal").modal('hide');
    });
}

function sleep(milliseconds) {
    const start = Date.now();
    while (Date.now() - start < milliseconds);
}



$(document).ready(function () {
    console.log("ready!!");
    ko.applyBindings(arenaViewModel);
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})


function removeFav(Id) {
    console.log("remove fav2")
    $("#fav-" + Id).remove();

    let fav2 = JSON.parse(localStorage.fav2|| '[]');

    const index = fav2.indexOf(Id);

    if (index != -1)
        fav2.splice(index, 1);

    localStorage.setItem("fav2", JSON.stringify(fav2));
}


$(document).ready(function () {
    showLoading();

    let fav2 = JSON.parse(localStorage.fav2 || '[]');

    console.log(fav2);


    for (const Id of fav2) {
        console.log(Id);

        ajaxHelper('http://192.168.160.58/NBA/api/Arenas/' + Id, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav2.length != 0) {
                console.log('bacalhau com natas');
                $("#table-favourites").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites").append(
                    `<tr id="fav-${Id}">
                    <td class="align-middle">${data.Id}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.StateName}</td>
                        <td class="align-middle">${data.TeamName}</td>
                        <td class="align-middle">${data.Location}</td>
                        <td class="align-middle"><img class="card-image" style="width:100px;height:100px" src="${data.Photo}"></td>
                        <td class="align-middle">
                        
                        <a href="./arenaDetails.html?id=${Id}" class="btn btn-default btn-light btn-xs">
                <i class="fa fa-eye" title="Show details"></i>
            </a>
                        </td>
                        <td class="text-end align-middle">
                            <a class="btn btn-default btn-sm btn-favourite" onclick="removeFav(${Id})"><i class="fa fa-heart text-danger" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )

            }
        });
        sleep(50);
    }

    hideLoading();
})