const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
/*


Please build your team
What is your manager's name?
What is your manager's id? >>Please enter a positive number greater than zero.
What is your manager's email? >>Please enter a valid email address
What is your manager's office number?

Which type of team member would you like to add?
> Engineer
> Intern
> I'm done.

What is your intern's name?
What is your intern's id? >>This ID is already taken. Please use a unique ID.
What is your intern's email address?
What is your intern's school?
>> Intern Added. (Jump back to new team member menu above)

What is your engineer's name?
What is your engineer's id?
What is your engineer's email address?
What is your engineer's GitHub user name?
>> Engineer Added. (Jump back to new team member menu above)

(after form completion)
Team file written. You can view it here: XXXXXXXXX

*/

// Validation functions
let usedIDs = [];
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const idValidator = async (input) => {
    if (/[^0-9]/.test(input)) {
        return 'Please enter a number.'
    } else {
        for (const id in usedIDs) {
            if (id === input) {
                return 'This ID is already taken. Please use a unique ID.';
            }
        }
        usedIDs.push(input);
        return true;
    }
};

const numberValidator = async (input) => {
    return /[^0-9]/.test(input) ? 'Please enter a number.' : true;
}

const emailValidator = async (input) => {
    return emailRegEx.test(input) ? true : 'Please enter a valid email address';
}

// Inquirer Prompts
inquirer
    .prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            default: "Mr Manager",
        },
        {
            type: "input",
            name: "managerID",
            message: "What is your manager's id?",
            default: "1234",
            validate: numberValidator,
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
            default: "example@mail.com",
            validate: emailValidator,
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?",
            default: "1234",
            validate: numberValidator,
        },
    ])
    .then( answers => console.log(answers) )
    .catch( error => console.error(error) );


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

