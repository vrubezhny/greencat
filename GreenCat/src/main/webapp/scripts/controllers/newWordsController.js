
angular.module('greenCat').controller('NewWordsController', function ($scope, $location, locationParser, flash, WordsResource , WebsitesResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.words = $scope.words || {};
    
    $scope.filteredList = [
        "true",
        "false"
    ];

    $scope.websitesIdList = WebsitesResource.queryAll(function(items){
        $scope.websitesIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("websitesIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.words.websitesId = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.words.websitesId.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The words was created successfully.'});
            $location.path('/Words');
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        WordsResource.save($scope.words, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Words");
    };
});