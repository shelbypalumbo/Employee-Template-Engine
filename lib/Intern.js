var Employee = require("./Employee");

//The Intern class takes in the name, id, and email arguments from the Emplyee class.
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email); //Properties from Employee class
    this.school = school; //References the returned data from to the getSchool method
  }
  getSchool() {
    return this.school;
  }
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
