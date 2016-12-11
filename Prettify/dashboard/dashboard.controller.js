angular.module("umbraco").controller("tweet.dashboard", function($scope, contentResource, entityResource) {
   
   
    entityResource.getByQuery("//staff", -1, "Document").then(function (document) {

        contentResource.getChildren(document.id).then(function (response) {
            var employees = response.items;
            _.each(employees, function (employee) {
                var date = moment(employee.updateDate);
                employee.outdated = date.diff(Date.now(), "days") <= -6;
                employee.diff = date.fromNow();
                employee.avatar = _.findWhere(employee.properties, { 'alias': 'twitterHandle' }).value;
            })

            $scope.employees = employees;

        });

    });
   
    
});