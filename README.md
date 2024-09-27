# Pet Adoption Website

![macmonitor (1)](https://github.com/user-attachments/assets/1bc8e9bb-da29-4c7e-bca9-3569b08b5a40)

## Table of Contents
- [Introduction](#introduction)
- [Project Goals](#project-goals)
- [User Stories](#user-stories)
- [Features](#features)
  - [User Authentication](#user-authentication)
  - [Text Files as Database](#text-files-as-database)
  - [Pet Search and Giveaway](#pet-search-and-giveaway)
  - [JavaScript Functionality](#javascript-functionality)
- [Technologies](#techonologies)
  - [Front-end Technologies](#front-end-technologies)
  - [Back-end Technologies](#back-end-technologies)
- [Challenges and Learning](#challenges-and-learning)
- [How to Run the Project](#how-to-run-the-project)
- [What I Would Do Differently](#what-i-would-do-differently)

## Introduction
This Pet Adoption Website is my first full-stack web application, developed during a university web programming course. The website is designed to facilitate pet adoption by allowing users to search for adoptable pets, sign up for an account, and even give away pets they can no longer care for. This project was a valuable learning experience in both front-end and back-end development, utilizing basic text files as a simple form of a database.

## Project Goals
The main goals of this project are:

- To create a functional web application that allows users to interact with a simulated pet adoption platform.
- To understand and implement basic CRUD (Create, Read, Update, Delete) operations using text files as a data store.
- To gain experience with user authentication, form validation, and session management.
- To provide a user-friendly interface for searching, adding, and managing pet adoption records.

## User Stories

- As a user, I want to search for adoptable pets based on criteria like breed, age, and compatibility with other pets and children.
- As a user, I want to give away a pet I can no longer care for by filling out a detailed form.
- As a user, I want to create an account and log in to manage my pet submissions.
- As a user, I want to be notified if I'm not signed in when attempting to access restricted features, such as submitting a pet for adoption.

## Features
### 1. User Authentication

- Sign Up: Users can create an account by providing a username and password. The sign-up process includes validation requirements:
   - Username: Must contain only letters and digits.
   - Password: Must be at least 4 characters long, containing at least one letter and one digit.
- Log In: Users can log in with their credentials. The application will notify users if their username or password is incorrect.
- Logout: The "Logout" option in the navigation menu is only available to users who are signed in. This is managed using the sessions package.

### 2. Text Files as a Database

- Data Storage: The application uses text files (available.txt, login.txt) to simulate a database.
   - available.txt: Stores pet records, where each line represents a pet and its attributes (e.g., ID, username, pet type, breed, age, gender, compatibility with other animals, description, owner, and email) are separated by colons.
   - login.txt: Stores user credentials, with each line containing a username and password separated by a colon. This is not secure but serves as a simple way to practice file I/O operations for user authentication.

### 3. Pet Search and Giveaway

- Search Form: Users can search for adoptable pets based on various criteria like breed, age, and compatibility with other pets and children. Results are dynamically displayed based on the search parameters.
- Giveaway Form: Logged-in users can submit their pets for adoption. The form includes validation checks to ensure all necessary information is provided. If a user is not logged in and attempts to access the giveaway form, they are prompted to log in first.

### 4. JavaScript Functionality

- Form Handling: JavaScript is used to handle form submissions, including sending form data to the server using the Fetch API and updating the DOM with the results.
- Dynamic Content: The JavaScript code dynamically generates content based on user interactions, such as displaying search results or notifying users of errors.
- Session Management: JavaScript works in tandem with server-side session management to control user access to specific features.Technologies Used

## Technologies

### Front-end Technologies

- HTML: Provides the structure of the website.
- CSS: Styles the website, focusing on a clean and simple design.
- JavaScript: Adds interactivity and handles form submissions and DOM manipulation.
  
### Back-end Technologies

- Node.js & Express.js: Powers the server-side logic, handling routes, processing form data, and managing sessions.
- File I/O: Reads from and writes to text files to simulate database operations.

## Challenges and Learning

This project was a significant learning experience in full-stack web development. Here are some of the key challenges and what I learned:

- Repetitive HTML: The project involves multiple HTML files, each with similar structures like the navbar and footer. This redundancy highlighted the potential benefits of using a templating engine or a front-end framework to manage repeated elements more efficiently.
- Basic Security: Using plain text files for user credentials is not secure and would not be suitable for a production environment. However, it was an excellent way to understand basic file I/O operations and the importance of security in web applications.
- JavaScript and DOM Manipulation: Working with JavaScript to handle form submissions and dynamically update the DOM was a new and valuable experience, reinforcing the importance of front-end interactivity.

## How to Run the Project

To run this project locally:

1. Download the code as a zip file and navigate to the project directory:
```
cd Pet-Adoption-Website
```
2. Install the necessary dependencies:
```
npm install
```
3. Run the server:
```
node server.js
```
4. Open your brower and go to:
```
http://localhost:5244
```

### What I Would Do Differently
Looking back on this project, there are several improvements I would consider:

- Use of a Database: Replace the text file-based data storage with a proper database like MongoDB or PostgreSQL to enhance data security and scalability.
- Front-end Frameworks: Implement a JavaScript front-end framework like React or Angular to avoid redundancy in HTML files and manage components like the navbar and footer more efficiently.
- Templating Engine: Incorporate a templating engine like EJS or Handlebars to dynamically generate HTML content and reduce the repetition of HTML code across multiple pages.
- Enhanced Security: Implement more robust authentication and authorization mechanisms, including hashing passwords and using environment variables for sensitive data.
