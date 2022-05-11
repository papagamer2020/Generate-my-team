const inquirer = require("inquirer");
const Intern = require("./lib/Intern.js");
const Engineer = require("./lib/Engineer.js");
const Manager = require("./lib/Manager.js");
const writeToFile = require("./utils/generate-site.js");
const generateHTML = require("./src/page-template.js");

const employees = [];

const engineerPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the engineer's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the engineer's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the engineer's email address:",
    },
    {
      type: "input",
      name: "github",
      message: "Enter the engineer's github username:",
    }
  ]);
};

const internPrompt = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the intern's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the intern's ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the intern's email address:",
    },
    {
      type: "input",
      name: "school",
      message: "Enter the intern's school:",
    }
  ]);
};

const employeePrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "Add an intern",
          "Add an engineer",
          "Finish building out team",
        ],
      },
    ])
    .then(({ choice }) => {
      if (choice === "Add an intern") {
        return internPrompt()
        .then((internData) => {
            const intern = new Intern(internData.name, internData.id, internData.email, internData.school);
            employees.push(intern);
            return employeePrompt();
        });
      } else if (choice === "Add an engineer") {
        return engineerPrompt()
        .then((engineerData) => {
            const engineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.github);
            employees.push(engineer);
            return employeePrompt();
        });
      } else {
        console.log(employees);
        return writeToFile('./dist/index.html', generateHTML(employees))
        .then((response) => {
            console.log(response);
        })
      }
    });
};

const startApplication = () => {
  // prompted to enter managers info at start of application
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the managers's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the managers's ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the manager's email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
      },
    ])
    .then((managersData) => {
        const manager = new Manager(managersData.name, managersData.id, managersData.email, managersData.officeNumber);
        employees.push(manager);
        return employeePrompt();
    })
};

startApplication()


