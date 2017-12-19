const app = angular.module("PlanetApp", []);
app.controller("MainController",["$http",function ($http) {
  this.url= "https://images-api.nasa.gov/search?q=";
  this.media="&media_type=image"
  this.searchterm ="earth";
  this.planet = {};
  this.planets= [];
  this.home = true;
  this.quiz = false;
  this.about= false;
  this.quizplanets=["earth","mars","mercury","venus","jupiter","saturn","uranus","neptune"]
  this.quizplanet="";
  this.lastanswer="";
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
      this.searchterm="";

    })
    .catch(err => this.planets = err)
  };
  this.getPlanet()
  this.showPlanet = (show) => {
    if (show) {
      show =false;
    }
    else {
      show =true;
    }
    return show;
  }

  this.goHome = () => {
    console.log("Going To Home");
    this.home = true;
    this.quiz = false;
    this.about= false;
  }

  this.goQuiz = () => {
    console.log("Going To Quiz");
    this.quizplanet=this.quizplanets[Math.floor(Math.random()*8)];
    this.searchterm=this.quizplanet;
    this.getPlanet();
    this.home = false;
    this.quiz = true;
    this.about= false;
  }
  this.answerQuiz =() => {
    this.quizterm = this.quizterm.toLowerCase();
    if (this.quizterm==this.quizplanet) {
      this.correct=true;
      this.wrong= false;
    }
    else {
      this.correct=false;
      this.wrong= true;
    }
    this.lastanswer = this.quizplanet;
    this.quizplanet="";
    this.quizplanet=this.quizplanets[Math.floor(Math.random()*8)];
    this.searchterm=this.quizplanet;
    this.getPlanet();
  }

  this.goAbout = () => {
    console.log("Going To About");
    this.home = false;
    this.quiz = false;
    this.about= true;
  }


}]);
