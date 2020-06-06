
// This code to read and set any environment variables with the dotenv package
require("dotenv").config();

// These are the gloabl variables 
var fs = require("fs");
var moment = require("moment");

var axios = require("axios");
var Spotify = require("node-spotify-api");

var spotifyKeyInfo = require("./keys.js");

var userInput = process.argv;
var inputTopic = process.argv[2];
var input = process.argv[3];
var songSearch = "";


// This function takes in the search commands depending on the user's input and toggles between commands as entered. 

function liriSwitch(inputTopic) {
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
            doWhatItSays();
            break;
    }

};
// =========================== Concert- This =========================== //
// This takes in the command: 'conert-this' 'band or artisit name' and returns the venue, city, state, and date of the upcoming concert, using the Bands In Town API.

function bandInfo() {
    var bandSearch = "";
    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            bandSearch = bandSearch + "+" + userInput[i];
        }
        else {
            bandSearch += userInput[i];
        }
    }
    var queryURL = "https://rest.bandsintown.com/artists/" + bandSearch + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            console.log("Venue Name: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log("State: " + response.data[0].venue.region);
            console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        }
    )

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });



}
// =========================== Spotify-This =========================== //
// This takes in the command: 'spotify-this' 'song title' and returns the artist, song, album url and album date, using the Spotify API and unique spotify ID and Secret. 

function songInfo() {
    // var songSearch = "";



    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            songSearch = songSearch + "+" + userInput[i];
        }
        else {
            songSearch += userInput[i];
        }
    }
    if (songSearch === "") {
        songSearch = "The Sign Ace of Base";
    } else if (input) {
        songSearch = input;
    }

    var spotify = new Spotify({
        id: spotifyKeyInfo["spotify"].id,
        secret: spotifyKeyInfo["spotify"].secret
    });

    spotify.request('https://api.spotify.com/v1/search?q=track:' + songSearch + '&type=track&limit=10', function (error, songResponse) {
        if (error) {
            return console.log(error);
        }
        console.log("Artist: " + songResponse.tracks.items[0].artists[0].name);
        console.log("Song: " + songResponse.tracks.items[0].name);
        console.log("URL: " + songResponse.tracks.items[0].preview_url);
        console.log("Album: " + songResponse.tracks.items[0].album.name);
    });

}


// =========================== Movie-This =========================== //
// This takes in the command: 'movie-this' 'movie name' and returns the movie name, release year, IMBD rating, Rotten Tomatoes rating, production coutnry, language, plot and actors of the movie using the OMBD API. 

function movieInfo() {
    var movieSearch = "";
    if (userInput.length <= 3) {
        movieSearch = "Mr. Nobody";
    }

    for (var i = 3; i < userInput.length; i++) {
        if (i > 3 && i < userInput.length) {
            movieSearch = movieSearch + "+" + userInput[i];
        }
        else {
            movieSearch += userInput[i];
        }
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieSearch + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Production Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}


// =========================== Do What It Says =========================== //

// This takes in the command 'do-what-it-says' and references the information in the random.txt file,passes it through the spotify-this function, and returns the artist, song, album url and album date. 

function doWhatItSays() {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", (err, data, ) => {

        if (err) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        console.log(dataArr);
        console.log(dataArr[0], dataArr[1]);
        let inputTopic = dataArr[0];
        songSearch = dataArr[1];

        switch (inputTopic) {
            case "spotify-this-song":
                songInfo();
                break;
        }
    })

}


// =========================== Logging Inputs=========================== //
// This takes in the command line queries and writes them to the log.txt file. 

var fs = require("fs");

fs.appendFile('log.txt', 'Command Requested: ' + inputTopic + ', ' + input + ". \n", function (err, ) {

    if (err) {
        console.log(err);
    }

    else {
        console.log("Your search as been added to the Log file!");
    }

});

liriSwitch(inputTopic)