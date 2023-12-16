// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Divisions/');
    self.displayName = 'NBA Team Details';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.ConferenceId = ko.observable('');
    self.ConferenceName = ko.observable('');
    self.DivisionId = ko.observable('');
    self.DivisionName = ko.observable('');
    self.Acronym = ko.observable('');
    self.StateName = ko.observable('');
    self.StateId = ko.observable('');
    self.City = ko.observable('');
    self.Logo = ko.observable('');
    self.History = ko.observable('');


    //--- Page Events
    self.activate = function (id, acronym) {
        console.log('CALL: getTeam...');
        var composedUri = self.baseUri() + id + "?Acronym=" + acronym;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            self.ConferenceId(data.ConferenceId);
            self.ConferenceName(data.ConferenceName);
            self.DivisionId(data.DivisionId);
            self.DivisionName(data.DivisionName);
            self.Acronym(data.Acronym);
            self.StateName(data.StateName);
            self.StateId(data.StateId);
            self.City(data.City);
            self.Logo(data.Logo);
            self.History(data.History);

        });
    };

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
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

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    var p2 = getUrlParameter('Acronym');
    console.log(pg, p2);
    if (pg == undefined)
        self.activate(1);
    else {
        if (p2 == undefined)
            self.activate(1);
        else {
            self.activate(pg, p2);
        }

    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})