const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// util - allows you to use write file, asynchronously.
const util = require("util");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
// writefile will create html page
const writeFileAsync = util.promisify(fs.writeFile);
const render = require("./lib/htmlRenderer");

let teamArray = [];

function addTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is your role?",
        choices: ["Engineer", "Intern", "Manager"],
        name: "role",
      },
    ])
    .then(function (reply) {
      if (reply.role === "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your ID?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your email?",
              name: "email",
            },
            {
              type: "input",
              message: "What is your Github?",
              name: "github",
            },
          ])
          .then(function (engineerReply) {
            const newEngineer = new Engineer(
              engineerReply.name,
              engineerReply.id,
              engineerReply.email,
              engineerReply.github
            );
            teamArray.push(newEngineer);
            newTeamMember();
          });
      } else if (reply.role === "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your ID?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your email?",
              name: "email",
            },
            {
              type: "input",
              message: "Where do you go to school?",
              name: "school",
            },
          ])
          .then(function (internReply) {
            const newIntern = new Intern(
              internReply.name,
              internReply.id,
              internReply.email,
              internReply.school
            );
            teamArray.push(newIntern);
            newTeamMember();
          });
      } else if (reply.role === "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your name?",
              name: "name",
            },
            {
              type: "input",
              message: "What is your ID?",
              name: "id",
            },
            {
              type: "input",
              message: "What is your email?",
              name: "email",
            },
            {
              type: "input",
              message: "What is your office number?",
              name: "officeNumber",
            },
          ])
          .then(function (managerReply) {
            const newManager = new Manager(
              managerReply.name,
              managerReply.id,
              managerReply.email,
              managerReply.officeNumber
            );
            teamArray.push(newManager);
            newTeamMember();
          });
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
// creates a prompt for a new team member to be used at the end of adding new team members, else push toHTML
function newTeamMember() {
  return inquirer
    .prompt([
      {
        type: "confirm",
        message: "Would you like to add another Team member?",
        name: "addnew",
      },
    ])
    .then(function (userAddNew) {
      if (userAddNew.addnew === true) {
        addTeamMember();
      } else {
        pushToHTML();
      }
    });
}
addTeamMember();

// pushes the data to HTML
function pushToHTML() {
  const createHtml = render(teamArray);
  writeFileAsync(outputPath, createHtml);
}
