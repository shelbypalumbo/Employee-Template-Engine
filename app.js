var inquirer = require("inquirer");
var Employee = require("./lib/Employee");
var Manager = require("./lib/Manager");
var Intern = require("./lib/Intern");
var Engineer = require("./lib/Engineer");
const util = require("util");
const fs = require("fs");
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);


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
  ])
}
                
var ManagerC = function(){
        return inquirer.prompt([
              {
                  type: "input",
                  name: "office",
                  message: "What is the employees office number?"
                }
  ])
}

var EngineerC = function(){
   return inquirer.prompt([
      {
          type: "input",
          name: "github",
          message: "What is your employees Github username?"
        }])
  }
  
var InternC = function(){
        return inquirer.prompt([
          {
              type: "input",
              name: "school",
              message: "Where does the mployee attend school?"
            },
  ])
}


//---------------------------------------------------------------
async function init() {
  try {
  const answers = await promptUser();
    if (answers.role == "Manager"){
      var officeNumber = ManagerC();
      var newManager = new Manager(answers.name, answers.role, answers.email, answers.id, officeNumber);
      var managerDiv = generateManagerHTML(newManager);
      await writeFileAsync("index.html", generateHTML.concat(managerDiv).concat(end))
      console.log("Added a Manager Card!")
    }
    else if(answers.role == "Engineer"){
      var getGithub = EngineerC();
      var newEngineer = new Engineer(answers.name, answers.email, answers.id, getGithub);
      var engineerDiv = generateEngineerHTML(newEngineer);
      await writeFileAsync("index.html", generateHTML.concat(engineerDiv).concat(end));
     console.log("Added an Engineer Card!")
    }else{
      var getSchool = InternC();
      var newIntern = new Intern(answers.name, answers.email, answers.id, getSchool);
      var internDiv = generateInternHTML(newIntern);
      await writeFileAsync("index.html", generateHTML.concat(internDiv).concat(end));
      console.log("Added an Intern Card!")
    }
  } catch (err) {
    console.log(err);
  }
}
init();



// -------Generate Card for Manager ---
function generateManagerHTML(manager){
return manager =
`<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <h3>${manager.name}</h3>
                <h4 class="card-title"><i class="fas fa-mug-hot"></i> ${manager.role}</h4>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li>ID: ${manager.id}</li>
                    <li>E-mail: ${manager.email}</li>
                    <li>Office Number: ${manager.officeNumber}</li>
        </p>
    </div>
  </div>`;}


//-------Generate Card for Engineer ---
function generateEngineerHTML(engineer){
return engineer =
 `<div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <h3>${engineer.name}</h3>
                <h4 class="card-title"><i class="fas fa-glasses"></i> ${engineer.role}</h4>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li>ID: ${engineer.id}</li>
                    <li>E-mail: ${engineer.email}</li>
                    <li>Github: ${engineer.github}</li>
        </p>
    </div>
  </div>`;};


//--------Generate Card for Intern ---
function generateInternHTML(intern){
  return intern =
    ` <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
            <div class="card-header">
                <h3>${intern.name}</h3>
                <h4 class="card-title"><i class="fas fa-user-graduate"></i> ${intern.role}</h4>
            </div>
    <div class="card-body">
      <p class="card-text">
                    <li>ID: ${intern.id}</li>
                    <li>E-mail: ${intern.email}</li>
                    <li>School: ${intern.school}</li>
        </p>
    </div>
  </div>`;}


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
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
      integrity="sha384-KA6wR/X5RY4zFAHpv/CnoG2UW1uogYfdnP67Uv7eULvTveboZJg0qUpmJZb5VqzN" crossorigin="anonymous">
    
    <title>Employee Summary</title>
    <style>
        header {    background-color: rgb(184, 92, 107);
                    color: white;
                    margin: 0;
                    padding: 25px;
                    text-align: center;
                }
        li {    list-style-type: none;
                border: 1px solid gray;
                padding: 10px;
        }
        .card-body {
            background-color: white;
            color: black;
        }
        .card-text {
            background-color: white;
            color: black;
        }
        .card{
          box-shadow: 7px 7px 3px grey;
        }
    
    </style>
</head>
<header>
  <h1>Team Page</h1>
</header>
<body>
    <div class="container">`;


const end = `</div></body></html>`;


