angular.module('greenCat').factory('WebsitesResource', function($resource){
    var resource = $resource('rest/websites/:WebsitesId',{WebsitesId:'@id'},{'queryAll':{method:'GET',isArray:true},'query':{method:'GET',isArray:false},'update':{method:'PUT'}});
    return resource;
});