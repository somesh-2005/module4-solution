(function() {
    'use strict';

    angular.module('MenuApp')
    .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            template: '<h1>Welcome to our Restaurant</h1><a ui-sref="categories">View Categories</a>'
        })
        .state('categories', {
            url: '/categories',
            templateUrl: 'templates/categories.template.html',
            controller: 'CategoriesController as catCtrl',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })
        .state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'templates/items.template.html',
            controller: 'ItemsController as itemCtrl',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
})();
