
// This code to read and set any environment variables with the dotenv package
require("dotenv").config();

var fs = require("fs");
var moment = require("moment");

var axios = require("axios");
var Spotify = require("node-spotify-api");

var spotifyKeyInfo = require("./keys.js");
// let keys = require("./assets/keys.js");

console.log(" \n Hi, I'm Liri! What do you want to do today? \n Choose from the following: 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says'");

var userInput = process.argv;
var inputTopic = process.argv[2];


switch (inputTopic) {
    case "concert-this":
        bandInfo();
        break;

    case "spotify-this-song":
        songInfo();
        break;

    case "movie-this":
        movieInfo();
        break;

    case "do-what-it-says":
        doWhatInfo();
        break;
}

// This code required to import the keys.js file and store it in a variable.



// =========================== Spotify =========================== //



// var spotify = new Spotify(keys.spotify);


function songInfo() {
    var songName = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            songName = songName + "+" + userInput[i];
        }
        else {
            songName += userInput[i];
        }
    }
    var spotify = new Spotify({
        id: spotifyKeyInfo["spotify"].id,
        secret: spotifyKeyInfo["spotify"].secret
    });


    spotify.request('https://api.spotify.com/v1/search?q=track:' + songName + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }
        console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
        console.log("Song: " + songResponse.tracks.items[0].name);
        console.log("URL: " + songResponse.tracks.items[0].preview_url);
        console.log("Album: " + songResponse.tracks.items[0].album.name);
    });






}




    // =========================== Movie =========================== //
    // var axios = require("axios");

    // var nodeArgs = process.argv;

    // var movieName = "";

    // for (var i = 2; i < nodeArgs.length; i++) {

    //     if (i > 2 && i < nodeArgs.length) {
    //         movieName = movieName + "+" + nodeArgs[i];
    //     } else {
    //         movieName += nodeArgs[i];

    //     }
    // }

    // var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // console.log(queryUrl);

    // axios.get(queryUrl).then(
    //     function (response) {
    //         console.log("Movie Title: " + response.data.Title);
    //         console.log("Release Year: " + response.data.Year);
    //         console.log("IMDB Rating: " + response.data.imdbRating);
    //         console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    //         console.log("Production Country: " + response.data.Country);
    //         console.log("Language: " + response.data.Language);
    //         console.log("Plot: " + response.data.Plot);
    //         console.log("Actors: " + response.data.Actors);
    //     })
    //     .catch(function (error) {
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             // that falls out of the range of 2xx
    //             console.log("---------------Data---------------");
    //             console.log(error.response.data);
    //             console.log("---------------Status---------------");
    //             console.log(error.response.status);
    //             console.log("---------------Status---------------");
    //             console.log(error.response.headers);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //             console.log(error.request);
    //         } else {
    //             // Something happened in setting up the request that triggered an Error
    //             console.log("Error", error.message);
    //         }
    //         console.log(error.config);
    //     });
