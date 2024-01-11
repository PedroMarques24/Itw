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
    console.log(localStorage.getItem(Id))
    $("#fav-" + Id).remove();

    let fav5 = JSON.parse(localStorage.fav5|| '[]');

    const index = fav5.indexOf(Id);

    if (index != -1)
        fav5.splice(index, 1);

    localStorage.setItem("fav5", JSON.stringify(fav5));
}


$(document).ready(function () {
    showLoading();

    let fav5 = JSON.parse(localStorage.fav5 || '[]');

    console.log(fav5);


    for (const Id of fav5) {
        console.log(Id);

        ajaxHelper('http://192.168.160.58/NBA/api/Teams/', 'GET').done(async function (data) {
            console.log(data)
            if (localStorage.fav5.length != 0) {
                var records = data.Records;
            
            for (let item of records) {
                if (item.Acronym == Id){
                    var id = item.Id
                    try {
                    let data = await ajaxHelper('http://192.168.160.58/NBA/api/Teams/' + id+"?Acronym=" + Id, "GET");

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
                        <td class="align-middle">${data.StateName}</td>
                        <td class="align-middle">
                        
                        <a href="./TeamsDetails.html?id=${data.Id}&Acronym=${data.Acronym}" class="btn btn-default btn-light btn-xs">
                <i class="fa fa-eye" title="Show team details"></i>
            </a>
                        </td>
                        <td class="text-end align-middle">
                            <a class="btn btn-default btn-sm btn-favourite" onclick="removeFav('${Id}')"><i class="fa fa-heart text-danger" title="Selecione para remover dos favoritos"></i></a>
                        </td>
                    </tr>`
                )
                } catch (error) {
                    console.error(error);
                }
                }
            }
        
                

            }
        });
        sleep(50);
    }

    hideLoading();
})