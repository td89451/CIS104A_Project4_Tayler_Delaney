/**
 *  @author Delaney, Tayler (delaneyt@student.ncmich.edu)
 *  @version 0.0.1
 *  @summary
 */

"use strict";
const PROMPT = require('readline-sync');
let movies = [];
let sortingOrder, continueResponse;

function main() {
    setInitialData();
    setSortingOrder();
    calcAvg();
    setContinueResponse();
    while (continueResponse === 1) {
        mainMenu();
        setContinueResponse();
    }
}

main();

function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nDo you want to go to the main menu? [0=no, 1=yes]: `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to go to the main menu? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function mainMenu() {
    let userChoice;
    console.log(`Enter 0 to exit program.`);
    console.log(`Enter 1 to view movies by average rating.`);
    console.log(`Enter 2 to add your own rating for an existing movie.`);
    console.log(`Enter 3 to add a new movie and rating.`);
    console.log(`------------------------------------------------------`);
    userChoice = Number(PROMPT.question(`Choice: `));
    switch(userChoice) {
        case 0:
            console.log(`Exiting...`);
            continueResponse = 0;
            break;

        case 1:
            process.stdout.write(`\x1Bc`);
            viewMovies();
            break;

        case 2:
            process.stdout.write(`\x1Bc`);
            viewMovies();
            console.log(`Enter number of movie you want to rate below. \n`);
            userChoice = Number(PROMPT.question(`>> `));
            rateMovie(userChoice - 1);
            break;

        case 3:
            process.stdout.write(`\x1Bc`);
            addNewMovie();
            rateMovie(movies.length - 1);
            console.log(`${movies[0].title}, ${movies[1].title}`);
            console.log(`${movies[0].ratings}, ${movies[1].ratings}`);
            break;

        default:
            console.log(`Invalid option, try again.`);
            process.stdout.write(`\x1Bc`);
            return mainMenu();
    }
}

function setInitialData() {
    movies.push({
        title: "John Wick",
        ratings: [5, 5, 5, 5]
    });
}

function addNewMovie() {
    let movieTitle = PROMPT.question("Title: ");
    movies.push({
        title: movieTitle,
        ratings: []
    });
}

function rateMovie(movieID) {
    let movieRating = Number(PROMPT.question(`Rating(1-5): `));
    if (movieRating < 1 || movieRating > 5) {
        console.log(`Invalid rating, try again.`);
        return rateMovie(movieID);
    } else {
        movies[movieID].ratings.push(movieRating);
    }
}

function viewMovies() {
    let userChoice;
    for (let i = 0; i < movies.length; i++) {
        console.log(`${i}. ${movies[i].title} [${movies[i].average} stars]`);
    }
    userChoice = PROMPT.question(`Change sorting order(y/n)?`);
    if (userChoice === "y") {
        setSortingOrder();
        movieSort();
        viewMovies();
    }
    setContinueResponse();
}

function calcAvg() {
    for (let i = 0; i < movies.length; i++) {
        let sum = movies[i].ratings.reduce((a, b) => a + b, 0);
        movies[i].average = sum / movies[i].ratings.length;
    }
}

function movieSort() {
    movies.sort((a, b) => {
        if (sortingOrder == "highest to lowest") {
            return a.average < b.average;
        } else {
            return a.average > b.average;
        }
    });
}

function setSortingOrder() {
    if (sortingOrder == "highest to lowest") {
        sortingOrder = "lowest to highest";
    } else {
        sortingOrder = "highest to lowest";
    }
}
/**
Movie Kiosk:  Write the code to run a kiosk at a movie theater. Program should loop infinitely to allow users to either see average rating of previous user entries, or enter their own review.

Requirements:

Should store movie title, current user rating, total rating, and number of ratings
Should display a list of movies for user to review or option to review a new one
-Should allow user to select a movie to see average rating
Should allow sorting of highest to lowest rated movies
*/
