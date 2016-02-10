
angular.module('greenCat').controller('NewWebsitesController', function ($scope, $location, locationParser, flash, WebsitesResource , WordsResource) {
    $scope.disabled = false;
    $scope.$location = $location;
    $scope.websites = $scope.websites || {};
    
    $scope.wordsIdList = WordsResource.queryAll(function(items){
        $scope.wordsIdSelectionList = $.map(items, function(item) {
            return ( {
                value : item.id,
                text : item.id
            });
        });
    });
    $scope.$watch("wordsIdSelection", function(selection) {
        if (typeof selection != 'undefined') {
            $scope.websites.wordsId = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.websites.wordsId.push(collectionItem);
            });
        }
    });


    $scope.save = function() {
        var successCallback = function(data,responseHeaders){
            var id = locationParser(responseHeaders);
            flash.setMessage({'type':'success','text':'The websites was created successfully.'});
            $location.path('/Websites');
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        WebsitesResource.save($scope.websites, successCallback, errorCallback);
    };
    
    $scope.cancel = function() {
        $location.path("/Websites");
    };
});