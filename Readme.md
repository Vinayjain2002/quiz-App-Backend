We want you to imagine that you’re already working with us. You’ve been given the task of developing a Quiz
web app for evaluating the users in various skill sets. The app will ask the users a set of questions and will
provide them a score at the end. You’ll need to do the following:
1. Developing the web app based on the design shared here:
https://www.figma.com/file/sz65ABV7RBrLzgIp8OQSB4/Frontend-Assignment
2. Modeling the REST API schema for the actions like starting the quiz, submitting responses for every
question and finishing the quiz.
We want you to use React for developing this app. Feel free to use any other additional libraries. The web
app should consume the REST APIs designed by you for the data layer. You need not build the backend, and
can either use any online service to host mock APIs or can create your own mock server and return static
data from it. You may also use Next.js for creating both the web app and dummy APIs.
We, at Upraised, understand that building products is an artform and there can be deltas from the mocks we
have given. We encourage you to exercise creative liberties and document them.
Screens


The app will contain the following screens:
Home:
● The user clicks on the “Start” button to begin with the quiz.
● This should create an API request to start a new quiz and fetch questions for it.
Question:
● This screen shows the questions to the user one after the other
● The question may include an optional image to be shown below the text
● A question may have only one correct choice
● The user must select at least one option before they can proceed to the next question
● The choices selected by the user must be submitted to the API before the next question is shown to
the user. Along with the selected choices, you must also include how much time the user took for a
particular question as part of the API payload.
● After the user submits the response for the last question, you’ll need to make an API request for
finishing the test and getting the score report.
Report:
● Shows the total score, and number of correct and incorrect answers.
● The “Start Again” button allows the user to take the quiz again from the beginning.
Scoring:
● You are free to come up with your own scoring logic.


Requirements:
● Writing down proper documentation for your fellow engineers to run your code.
● Follow REST guidelines for URL patterns, Request Types, and Response status codes.
● Best practices in whatever frameworks or technologies are chosen.
● Clean code with comments for clarity wherever needed
Bonus (if time permits):
● Containerized Application (using Docker)
● Production-ready code with error logging and exception handling wherever needed.
● Live Deployed Application
Notes:
● Please build the app in small logical steps and commit each step to a GitHub/Gitlab repository. You’ll
need to share the Git repository with us for review.
Please invite @jatinparab98, @cnp96 and @gkcgautam to the repository.
● Try to finish the assignment within 3 days of starting



APIs:
● This should create an API request to start a new quiz and fetch questions for it.
● The choices selected by the user must be submitted to the API before the next question is shown to
the user. Along with the selected choices, you must also include how much time the user took for a
particular question as part of the API payload.
● After the user submits the response for the last question, you’ll need to make an API request for
finishing the test and getting the score report.