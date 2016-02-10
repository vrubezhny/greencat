

angular.module('greenCat').controller('EditWordsController', function($scope, $routeParams, $location, flash, WordsResource , WebsitesResource) {
    var self = this;
    $scope.disabled = false;
    $scope.$location = $location;
    
    $scope.get = function() {
        var successCallback = function(data){
            self.original = data;
            $scope.words = new WordsResource(self.original);
            WebsitesResource.queryAll(function(items) {
                $scope.websitesIdSelectionList = $.map(items, function(item) {
                    var wrappedObject = {
                        id : item.id
                    };
                    var labelObject = {
                        value : item.id,
                        text : item.id
                    };
                    if($scope.words.websitesId){
                        $.each($scope.words.websitesId, function(idx, element) {
                            if(item.id == element.id) {
                                $scope.websitesIdSelection.push(labelObject);
                                $scope.words.websitesId.push(wrappedObject);
                            }
                        });
                        self.original.websitesId = $scope.words.websitesId;
                    }
                    return labelObject;
                });
            });
        };
        var errorCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The words could not be found.'});
            $location.path("/Words");
        };
        WordsResource.get({WordsId:$routeParams.WordsId}, successCallback, errorCallback);
    };

    $scope.isClean = function() {
        return angular.equals(self.original, $scope.words);
    };

    $scope.save = function() {
        var successCallback = function(){
            flash.setMessage({'type':'success','text':'The words was updated successfully.'}, true);
            $scope.get();
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        };
        $scope.words.$update(successCallback, errorCallback);
    };

    $scope.cancel = function() {
        $location.path("/Words");
    };

    $scope.remove = function() {
        var successCallback = function() {
            flash.setMessage({'type': 'error', 'text': 'The words was deleted.'});
            $location.path("/Words");
        };
        var errorCallback = function(response) {
            if(response && response.data && response.data.message) {
                flash.setMessage({'type': 'error', 'text': response.data.message}, true);
            } else {
                flash.setMessage({'type': 'error', 'text': 'Something broke. Retry, or cancel and start afresh.'}, true);
            }
        }; 
        $scope.words.$remove(successCallback, errorCallback);
    };
    
    $scope.filteredList = [
        "true",
        "false"
    ];
    $scope.websitesIdSelection = $scope.websitesIdSelection || [];
    $scope.$watch("websitesIdSelection", function(selection) {
        if (typeof selection != 'undefined' && $scope.words) {
            $scope.words.websitesId = [];
            $.each(selection, function(idx,selectedItem) {
                var collectionItem = {};
                collectionItem.id = selectedItem.value;
                $scope.words.websitesId.push(collectionItem);
            });
        }
    });
    
    $scope.get();
});