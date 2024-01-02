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

function TeamsViewModel() {
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
var teamsViewModel = new TeamsViewModel();
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
    ko.applyBindings(teamsViewModel);
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})


function removeFav(Id) {
    console.log("remove fav5")
    $("#fav-" + Id).remove();

    let fav5 = JSON.parse(localStorage.fav5|| '[]');

    const index = fav5.indexOf(Id);

    if (index != -1)
        fav5.splice(index, 1);

    localStorage.setItem("fav5", JSON.stringify(fav2));
}


$(document).ready(function () {
    showLoading();

    let fav5 = JSON.parse(localStorage.fav5 || '[]');

    console.log(fav5);


    for (const Id of fav5) {
        console.log(Id);

        ajaxHelper('http://192.168.160.58/NBA/api/Teams/' + Id, 'GET').done(function (data) {
            console.log(data)
            if (localStorage.fav.length != 0) {
                console.log('bacalhau com natas');
                $("#table-favourites").show();
                $('#noadd').hide();
                $('#nofav').hide();
                $("#table-favourites").append(
                    `<tr id="fav-${Id}">
                    <td class="align-middle">${data.Acronym}</td>
                        <td class="align-middle">${data.Name}</td>
                        <td class="align-middle">${data.City}</td>
                        <td class="align-middle">${data.ConferenceName}</td>
                        <td class="align-middle">${data.DivisionName}</td>
                        <td class="align-middle">${data.State}</td>
                        <td class="align-middle">
                        
                        <a href="./TeamsDetails.html?id=${Id}&Acronym=${data.Acronym}" class="btn btn-default btn-light btn-xs">
                <i class="fa fa-eye" title="Show team details"></i>
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