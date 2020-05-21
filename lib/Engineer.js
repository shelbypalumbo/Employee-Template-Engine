var Employee = require("./Employee");

//The Engineer class takes in the name, id, and email arguments from the Emplyee class.
class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email); //Properties from Employee class
    this.github = github; //References the returned data from to the getGithub method
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;
