(function(){
    'use strict';

    angular.module('homeController', [])
        .controller('homeController', homeController);

    homeController.$inject = ['homeService'];

    function homeController(homeService) {

        // grid (and its data) are in the service for persistence
        var hc = this;
        hc.myGrid = homeService.myGrid;
        hc.openDialog = openDialog;
        hc.openMe = openMe;

        function openDialog (person) {
            homeService.openDialog(person);
        }

        function openMe() {
            console.log("OPEN ME!!!");
        }



    }

}());
