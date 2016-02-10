

angular.module('greenCat').controller('EditWebsitesController', function($scope, $routeParams, $location, flash, WebsitesResource , WordsResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.websites = new WebsitesResource(self.original);
            WordsResource.queryAll(function(items) {
                $scope.wordsIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.websites.wordsId){
                        $.each($scope.websites.wordsId, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.wordsIdSelection.push(labelObject);
                                $scope.websites.wordsId.push(wrappedObject);
                            }
                        });
                        self.original.wordsId = $scope.websites.wordsId;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The websites could not be found.'});
            $location.path("/Websites");
        };
        WebsitesResource.get({WebsitesId:$routeParams.WebsitesId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.websites);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The websites was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.websites.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Websites");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The websites was deleted.'});
            $location.path("/Websites");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.websites.$remove(successCallback, errorCallback);
    };
    
    $scope.wordsIdSelection = $scope.wordsIdSelection || [];
    $scope.$watch("wordsIdSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.websites) {
            $scope.websites.wordsId = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.websites.wordsId.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});