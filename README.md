
# Background
Hi, and welcome to Corona Diaries! I made this as a project to get more familar with creating full-stack applications from scratch. I've always found social media apps really interesting because they bring people together, which is why I created this web application. In the light of covid-19, I wanted to create a space for people to anonomously share what's on their mind and hopefully find other people in similar boats. Currently, you can type in and post your thoughts with a title and body text, view all the posts from the begning of time (aka this project), and search the posts to find relevant information.

This is a work in progress, more updates to come!

# Tech Stack and Justification:
This project was made with HTML/CSS and JavaScript, with Node.js on the server side, and MongoDB as the database. 

MongoDB
- Mongo was chosen because it has long term advantages (ie collections), as this project grows
- Schema-less which is useful longer term, meaning that future items stored don't have to have the same format
- Easy to scale

Jest
- Jest has great, readable syntax
- Native support for snapshot testing (to incorporate soon)
- Has a lot of general documentation 

Monk
- Useful API for Node.js to interface with MongoDB, improves usability

Express
- Popular Node.js middleware that is useful for defining different routes within the application, saves time and lines of code

# Installation Instructions
- Install Node.js
- Install MongoDB
- Clone this repository 
- Run: npm init -y
- Run: npm install express morgan
- Run: npm install cors
- Run: npm install monk
- Run: npm start
- In a web browser, open 'localhost:8080'

# Going Forward
This is very much a work in progress! In the future I want to add the ability to:
- Make a user profile
- Authenticate
- React and reply to posts
- Upload images
- More!
