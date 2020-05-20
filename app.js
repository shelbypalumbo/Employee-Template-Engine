//----------------------Dependencies----------------------------------------------
var inquirer = require("inquirer");
var Manager = require("./lib/Manager");
var Intern = require("./lib/Intern");
var Engineer = require("./lib/Engineer");
const util = require("util");
const fs = require("fs");
const appendFileAsync = util.promisify(fs.appendFile);

//---------------------Start of the HTML file--------------------------------------
var generateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
      integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossorigin="anonymous">
    
    <title>Employee Summary</title>
    <style>
    /* Styling for the employee cards */
    body {  background-color:rgb(196, 200, 255);
    }
    header {  background-color: rgb(43, 50, 156);
              color: white;
              margin: 0;
              padding: 25px;
              text-align: center;
              }
      li {  list-style-type: none;
            padding: 8px;
      }
      .card-body, .card-text {  background-color: white;
                    color: black;
      }
      .card{  margin: 10px;
              float:left;
              box-shadow: 7px 7px 3px grey;
      }
      .card-header{ background-color: rgb(66, 77, 230);
      }
      h5{ color: black;
      }
      .container {
        margin:auto;
        height:100vh;
      }
    </style>
</head>
<header>
  <h1>Team Employees</h1>
</header>
<body>
    <div class="container">`;

//-------Generate Emplyee Card for a Manager -----------------------------------------
function generateManagerCard(manager) {
  return (manager = `
  <div class="card text-white mb-3" style="width: 21rem;">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h5 class="card-title"><i class="fas fa-mug-hot"></i> Manager</h5>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li><b>ID:</b> ${manager.id}</li><hr>
                    <li><b>E-mail:</b> ${manager.email}</li><hr>
                    <li><b>Office Number:</b> ${manager.officeNumber}</li>
        </p>
    </div>
  </div>`);
}

//-------Generate Employee Card for an Engineer -------------------------------------------
function generateEngineerCard(engineer) {
  return (engineer = `
  <div class="card text-white mb-3" style="width: 21rem;">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h5 class="card-title"><i class="fas fa-glasses"></i> Engineer</h5>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li><b>ID:</b> ${engineer.id}</li><hr>
                    <li><b>E-mail:</b> ${engineer.email}</li><hr>
                    <li><b>Github:</b> ${engineer.github}</li>
        </p>
    </div>
  </div>`);
}

//--------Generate Employee Card for an Intern -----------------------------------------------
function generateInternCard(intern) {
  return (intern = ` 
  <div class="card text-white mb-3" style="width: 21rem;">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h5 class="card-title"><i class="fas fa-user-graduate"></i> Intern</h5>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li><b>ID:</b> ${intern.id}</li><hr>
                    <li><b>E-mail:</b> ${intern.email}</li><hr>
                    <li><b>School:</b> ${intern.school}</li>
        </p>
    </div>
  </div>`);
}

//----The end variable gets appended to the end of the html file, once the user is done adding employees.
const end = `</div>
          </body>
        </html>`;

//---The begining of the HTML page is generated first, then the intial prompt function is called.
//Write the generateHTML variable to the index.html file and
fs.writeFile("index.html", generateHTML, function(err) {
  if (err) {
    return console.log(err);
  }
});
initialPrompt(); //Initial prompt function is first called

//Initial prompt--------------------------------------------
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your employees name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is your employees id number?"
    },
    {
      type: "input",
      name: "email",
      message: "What is your employees email?"
    },
    {
      type: "rawlist",
      name: "role",
      choices: ["Manager", "Engineer", "Intern"]
    }
  ]);
}

//These functions are called based on what the users role selection is.
//The user will then be prompted for more information about the employee.
var managerCard = function() {
  return inquirer.prompt([
    {
      type: "input",
      name: "office",
      message: "What is the employees office number?"
    }
  ]);
};

var engineerCard = function() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "What is your employees Github username?"
    }
  ]);
};

var internCard = function() {
  return inquirer.prompt([
    {
      type: "input",
      name: "school",
      message: "Where does the employee attend school?"
    }
  ]);
};

//------------------------------------------------------------
async function initialPrompt() {
  try {
    const answers = await promptUser();
    if (answers.role == "Manager") {
      var officeNumber = await managerCard(); //Pauses the async function until the managerCard function executes each prompt
      var newManager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        officeNumber.office
      );
      var managerDiv = generateManagerCard(newManager); //Generate a manager card using the data received from prompts
      await appendFileAsync("index.html", managerDiv); //Append manager card to the index.html file
      console.log("Added a Manager Card!");
    } else if (answers.role == "Engineer") {
      var getGithub = await engineerCard();
      var newEngineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        getGithub.github
      );
      var engineerDiv = generateEngineerCard(newEngineer);
      await appendFileAsync("index.html", engineerDiv);
      console.log("Added an Engineer Card!");
    } else {
      var getSchool = await internCard();
      var newIntern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        getSchool.school
      );
      var internDiv = generateInternCard(newIntern);
      await appendFileAsync("index.html", internDiv);
      console.log("Added an Intern Card!");
    }
    inquirer
      .prompt([
        {
          type: "rawlist",
          name: "employee",
          message: "Add another employee",
          choices: ["Yes", "No"]
        }
      ])
      .then(function(addEmployee) {
        if (addEmployee.employee == "Yes") {
          initialPrompt();
        } else {
          appendFileAsync("index.html", end);
        }
      });
  } catch (err) {
    console.log(err);
  }
}
