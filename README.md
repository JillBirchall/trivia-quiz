# Triva Quiz App
<<<<<<< HEAD

A 20 question multiple choice quiz with a timer, score and choice of categories.

Each question has a 15 second timer, and the score awarded for the correct answer varies depending on the time left on the timer:

- 0 to 5 seconds: 10 points
- 6 to 10 seconds: 20 points
- 11 to 15 seconds: 30 points

After an answer is clicked, it is highlighted in green if it is the correct answer, otherwise it is highlighted in red.

The final score is displayed at the end of the quiz, with an option to play again.

The questions used in this quiz are taken from the [Open Trivia DB](https://opentdb.com) API.

This app also features a loader and an error page which is displayed in cases where the questions cannot be retrieved from the API for any reason.

## Issues I encountered

I originally intended to have the category list dynamically generated from all the available categories (which would be retrieved using the API), however when testing this I noticed that some of the category/difficulty combinations selected did not contain enough questions. Although it would have been possible to check this using the API response codes, I didn't think it would be a good user experience to show an error message to say that the selected category doesn't have enough questions and not having all 3 difficulties available for every category. Therefore I have hard-coded a selection of categories which have at least 20 questions available for each difficulty level.

## Future Improvements

- If the wrong answer is clicked, also highlight the correct answer in green.
- Make further improvements and changes to the appearance of the app
- Add a back-end and create a high score table
=======
A 20 question multiple choice quiz with a timer, score and choice of categories. 

Each question has a 15 second timer, and the score awarded for the correct answer varies depending on the time left on the timer: 

* 0 to 5 seconds: 10 points
* 6 to 10 seconds: 20 points
* 11 to 15 seconds: 30 points

After an answer is clicked, it is highlighted in green if it is the correct answer, otherwise it is highlighted in red.

The final score is displayed at the end of the quiz, with an option to play again. 

The questions used in this quiz are taken from the [Open Trivia DB](https://opentdb.com) API.

This app also features a loader and an error page which is displayed in cases where the questions cannot be retrieved from the API for any reason. 

## Issues I encountered
I originally intended to have the category list dynamically generated from all the available categories (which would be retrieved using the API), however when testing this I noticed that some of the category/difficulty combinations selected did not contain enough questions. Although it would have been possible to check this using the API response codes, I didn't think it would be a good user experience to show an error message to say that the selected category doesn't have enough questions and not having all 3 difficulties available for every category. Therefore I have hard-coded a selection of categories which have at least 20 questions available for each difficulty level. 

## Future Improvements

* If the wrong answer is clicked, also highlight the correct answer in green.
* Make further improvements and changes to the appearance of the app
* Add a back-end and create a high score table

>>>>>>> 393c0e6149f381a89890ca774a5b057b35236541
