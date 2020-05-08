const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Sets up an empty Array to be used with the 'render' function
let employeeList = [];

// Questions ask for the name, ID number and email - different questions will be asked
// depending on whether the user wants to add in a manager, engineer or intern
const questions = require("./lib/questions");

// Writes the team.html file, or the page that lists all employees and their 
// respective characteristics
function writeTeamFile(filename, data) {
    fs.writeFile(filename, data, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("team.html successfully created!");
        }
    });
}

// Adds an employee to the list to be rendered
function addEmployee(response) {
    const empName = response.name;
    const empId = response.id;
    const empEmail = response.email;

    // Adds a manager, engineer or intern to the employee list depending on user input
    switch(response.employeeRole) {
        case "Manager":
            employeeList.push(new Manager(empName, empId, empEmail, response.officeNumber));
            break;
        case "Engineer":
            employeeList.push(new Engineer(empName, empId, empEmail, response.github));
            break;
        case "Intern":
            employeeList.push(new Intern(empName, empId, empEmail, response.school));
            break;
    }

    // Determines whether to write the team.html page depending
    // on whether the user wants to add more employees
    //
    // If so, recursion is used to ask the questions again and repeat the process
    // If not, the file is written with the current employee Array
    if(response.addAnotherEmployee === true) {
        inquirer.prompt(questions).then(response2 => {
            addEmployee(response2);
        });
    } else {
        writeTeamFile(outputPath, render(employeeList));
    }

}

// Prompts the user to answer questions to add employees
inquirer.prompt(questions).then(response => {
    addEmployee(response);
});
