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


// Validation functions
let usedIDs = [];
let suggestedID = 1234;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const idValidator = async (input) => {
    if (/[^0-9]/.test(input)) {
        return 'Please enter a number.'
    } else {
        for (let i = 0; i < usedIDs.length; i++) {
            if ( input === usedIDs[i] ) {
                return 'This ID is already taken. Please use a unique ID.';
            }
        }
        usedIDs.push(input);
        suggestedID++;
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
            name: "name",
            message: "What is your manager's name?",
            default: "Mr Manager",
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?",
            default: suggestedID,
            validate: idValidator,
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?",
            default: "example@mail.com",
            validate: emailValidator,
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?",
            default: "1234",
            validate: numberValidator,
        },
        {
            type: "list",
            name: "continue",
            message: "Which type of team member would you like to add?",
            choices: [
              "Engineer", "Intern", "I'm done"],
        }
    ])
    .then( answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        if (answers.continue === "I'm done") {
            main(manager);
        } else {
            main(manager, answers.continue);
        }
     } )
    .catch( error => console.error(error) );

// Inquirer loop
const teamInput = async (role, inputs = []) => {
    const prompts = [
      {
        type: "input",
        name: "name",
        message: "What is your enigneer's name?",
        default: "Engineer Guy",
        when: () => role === "Engineer"
      },
      {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
        default: suggestedID,
        validate: idValidator,
        when: () => role === "Engineer"
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        default: "engineer@mail.com",
        validate: emailValidator,
        when: () => role === "Engineer"
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub user name?",
        default: "github-user",
        when: () => role === "Engineer"
      },
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
        default: "Intern Dude",
        when: () => role === "Intern"
      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
        default: suggestedID,
        validate: idValidator,
        when: () => role === "Intern"
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
        default: "intern@mail.com",
        validate: emailValidator,
        when: () => role === "Intern"
      },
      {
        type: "input",
        name: "school",
        message: "What is your intern's school?",
        default: "Dark Net Academy",
        when: () => role === "Intern"
      },
      {
        type: "list",
        name: "continue",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer", "Intern", "I'm done"],
      }
    ];
  
    const { ...answers } = await inquirer.prompt(prompts);
    let teamMember;
    if (role === "Engineer") {
        teamMember = new Engineer(answers.name, answers.id, answers.email, answers.github);
    } else {
        teamMember = new Intern(answers.name, answers.id, answers.email, answers.school);
    }
    const newInputs = [...inputs, teamMember];
    return (answers.continue === "I'm done") ? newInputs : teamInput(answers.continue, newInputs);
  };
  
  const main = async (manager, teamMembers = false) => {
    if (teamMembers) {
        const inputs = await teamInput(teamMembers);
        console.log(render([manager, ...inputs]));
    } else {
        console.log(manager);
    }
  };


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

