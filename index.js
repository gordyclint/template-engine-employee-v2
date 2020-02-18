// Dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");

// Output File
// const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.resolve(__dirname, "output", "team.html")


// Javascript Libraries
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const render = require('./lib/htmlRenderer');


// Placeholders
const teamMembers = [];
const idArray = [];

const getQuestions = teamMember => [
    {
        type: "input",
        name: "name",
        messages: `What is your ${teamMember}'s name?`
    },
    {
        type: "input",
        name: "id",
        messages: `What is your ${teamMember}'s id?`
    },
    {
        type: "input",
        name: "email",
        messages: `What is your ${teamMember}'s email?`
    },
];

const teamMenu = () => {

    const addManager = async () => {
        const response = await inquirer.prompt([
            ...getQuestions("manager"),
            {
                type: "input",
                name: "officeNumber",
                messages: "What is your manager's office number?"
            }
        ]);

        const { name, id, email, officeNumber } = response;
        const manager = new Manager(name, id, email, officeNumber);

        teamMembers.push(manager);
        idArray.push(id);

        createTeam();
    };

    const addEngineer = async () => {
        const response = await inquirer.prompt([
            ...getQuestions("engineer"),
            {
                type: "input",
                name: "github",
                message: "What is your engineer's Github username?"
            }
        ]);
        const { name, id, email, github } = response;
        const engineer = new Engineer(name, id, email, github);

        teamMembers.push(engineer);
        idArray.push(id);

        createTeam();
    };

    const addIntern = async () => {
        const response = await inquirer.prompt([
            ...getQuestions("intern"),
            {
                type: "input",
                name: "school",
                message: "What is your intern's school?"
            }
        ]);

        const { name, id, email, school } = response;
        const intern = new Intern(name, id, email, school);

        teamMembers.push(intern);
        idArray.push(id);

        createTeam();
    };

    const createTeam = async () => {
        const response = await inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "I don't want to add any more team members"]
            }
        ]);
        switch (response.memberChoice) {
            case "Engineer":
                addEngineer();
                break;

            case "Intern":
                addIntern();
                break;
                
            default:
                fs.writeFileSync(outputPath, render(teamMembers), "utf8");
                break;
        }
    };

    addManager();

}

teamMenu();

