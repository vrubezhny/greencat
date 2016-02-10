angular.module('greenCat').factory('WordsResource', function($resource){
    var resource = $resource('rest/words/:WordsId',{WordsId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});