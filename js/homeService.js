(function(){
    'use strict';

    angular.module('homeService', [])
        .service('homeService', homeService);

    homeService.$inject = ['$http', 'ngDialog'];

    function homeService($http, ngDialog) {

        // list everything
        var hs = this;
        hs.openDialog = openDialog;

        //hs.myGrid = { data: undefined };
        hs.myGrid = {
            data: undefined,
            enableFiltering: true,
            //enableFullRowSelection: true,
            showColumnFooter: true,
            columnDefs: [
                { field: 'name' },
                //{ field: 'height' },
                //{ field: 'mass', name: 'weight', cellTemplate: '<span>{{ row.entity.mass }} kg</span>'},
                //{ field: 'hair_color' },
                { field: 'species', cellTemplate: '<button class="btn btn-info" ng-click="grid.appScope.hc.openDialog(row.entity)">More Info</button>' }
            ],
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25
        };

        function openDialog(person) {
            ngDialog.open({ plain: true, template: `<div>Name: ${person.name}</div>
            <div>Height: ${person.height} cm</div>
            <div>Weight: ${person.mass} kg</div>
            <div>Hair Color: ${person.hair_color}</div>
            <button class="btn btn-primary" ng-click="closeThisDialog()">OK</button>` });
        }

        getData().then(function(data){
            hs.myGrid.data = data;
        });

        // private function
        function getData() {
            return $http.get('http://swapi.co/api/people')
                .then(function (response) {
                    //response.data.results.forEach(function (row) {
                    //    $http.get(row.species[0]).then(function (resp) {
                    //        row.speciesName = resp.data.name;
                    //    });
                    //});
                    //console.log(response.data.results[0]);
                    return response.data.results;
                });
        }

    }

}());
