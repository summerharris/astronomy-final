const app = angular.module("MovieApp", []);
app.controller("MainController",["$http",function ($http) {
  this.url= "https://images-api.nasa.gov/search?q=";
  this.media="&media_type=image"
  this.searchterm ="mars"
  this.planet = {};
  this.planets= [];
  //update state
  this.getPlanet = () => {
    console.log("getting Planets");
    $http(
      {
        url:this.url+this.searchterm+this.media,
        method:"GET"
      }
    ).then((response) => {
      this.planets=response.data.collection.items;
      console.log(response.data.collection.items);

    })
    .catch(err => this.planets = err)
  };
  this.showPlanet = (show) => {
    if (show) {
      show =false;
    }
    else {
      show =true;
    }
    return show;
  }


}]);
