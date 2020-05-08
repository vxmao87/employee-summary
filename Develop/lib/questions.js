const questions = [
    {
        type: "input",
        name: "name",
        message: "Please enter your first and last name: "
    },
    {
        type: "input",
        name: "id",
        message: "Please enter your ID number: "
    },
    {
        type: "input",
        name: "email",
        message: "Please enter your email: "
    },
    {
        type: "list",
        name: "employeeRole",
        message: "Please specify your role in your company: ",
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Please enter your office number: ",
        when: (answers) => answers.employeeRole === "Manager"
    },
    {
        type: "input",
        name: "github",
        message: "Please enter your GitHub username: ",
        when: (answers) => answers.employeeRole === "Engineer"
    },
    {
        type: "input",
        name: "school",
        message: "Please enter the name of your school: ",
        when: (answers) => answers.employeeRole === "Intern"
    },
    {
        type: "confirm",
        name: "addAnotherEmployee",
        message: "Would you like to add another employee?",
        default: true
    }
];

module.exports = questions;