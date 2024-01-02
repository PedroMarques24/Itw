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

function SeasonsViewModel() {
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
var seasonsViewModel = new SeasonsViewModel();
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
    ko.applyBindings(seasonsViewModel);
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})


function removeFav(Id) {
    console.log("remove fav4")
    $("#fav-" + Id).remove();

    let fav4 = JSON.parse(localStorage.fav4|| '[]');

    const index = fav4.indexOf(Id);

    if (index != -1)
        fav4.splice(index, 1);

    localStorage.setItem("fav4", JSON.stringify(fav4));
}


$(document).ready(function () {
    showLoading();

    let fav4 = JSON.parse(localStorage.fav4 || '[]');

    console.log(fav4);


    for (const Id of fav4) {
        console.log(Id);

        ajaxHelper('http://192.168.160.58/NBA/api/Seasons/' + Id, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav.length != 0) {
                console.log('bacalhau com natas');
                $("#table-favourites").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites").append(
                    `<tr id="fav-${Id}">
                    <td class="align-middle">${data.Id}</td>
                        <td class="align-middle">${data.Season}</td>
                        <td class="align-middle">

                        <a href="./SeasonsDetails.html?id=${Id}" class="btn btn-default btn-light btn-xs">
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