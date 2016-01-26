(function(){
    'use strict';

    angular.module('homeService', [])
        .service('homeService', homeService);

    homeService.$inject = ['$http', 'uiGridConstants'];

    function homeService($http, uiGridConstants) {

        // list everything
        var hs = this;
        //hs.myGrid = { data: undefined };
        hs.myGrid = {
            data: undefined,
            enableFiltering: true,
            enableFullRowSelection: true,
            showColumnFooter: true,
            columnDefs: [
                { field: 'name' },
                { field: 'height' },
                { field: 'mass', name: 'weight', cellTemplate: '<span>{{ row.entity.mass }} kg</span>'},
                { field: 'hair_color' },
                { field: 'speciesName' }
            ],
            columnDefsx: [
                { field: 'name' },
                { field: 'company' },
                { field: 'email', name: 'emailAddress',
                    cellTemplate: '<a class="text-input" ng-href="mailto:{{ row.entity.email }}" ng-click="$event.stopPropagation()">'
                        + '{{ row.entity.email }}</a>' },
                { field: 'phone' },
                { field: 'balance', width: 120 },
                { field: 'age', width: 70, aggregationType: uiGridConstants.aggregationTypes.avg },
                { field: 'about', enableSorting: false,
                    cellTooltip: function(row, col) {
                        return row.entity.about;
                    }
                },
                // unused fields from json file
                //{ field: 'id' },
                //{ field: 'guid' },
                //{ field: 'isActive' },
                //{ field: 'registration' },
                //{ field: 'friends' },
                //{ field: 'picture' },
                //{ field: 'gender' },
                //{ field: 'address' },
            ],
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25
        };

        getData().then(function(data){
            hs.myGrid.data = data;
        });

        // private function
        function getData() {
            return $http.get('http://swapi.co/api/people')
                .then(function (response) {
                    response.data.results.forEach(function (row) {
                        $http.get(row.species[0]).then(function (resp) {
                            row.speciesName = resp.data.name;
                        });
                    });
                    console.log(response.data.results[0]);
                    return response.data.results;
                });
        }

    }

}());
