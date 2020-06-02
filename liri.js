
// This code to read and set any environment variables with the dotenv package
require("dotenv").config();

console.log(" \n Hi, I'm Liri! What do you want to do today? \n Choose from the following: 'concert-this', 'spotify-this-song', 'movie-this' or 'do-what-it-says'");
// This code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");

// Allows access to keys information 
var spotify = new Spotify(keys.spotify);

// Arguments
var action = process.argv[2];
var input = process.argv[3];
var nodeArgs = process.argv;

console.log("Command chosen: " + action);

//Switch-case statement for different commands 
switch (action) {
    case "concert-this":
        concert();
        break;

    case "spotify-this-song":
        song();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        random();
        break;
};

// Command Functions 

