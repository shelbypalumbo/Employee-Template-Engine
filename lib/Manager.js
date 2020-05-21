var Employee = require("./Employee");

//The Manager class takes in the name, id, and email arguments from the Emplyee class.
class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email); //Properties from Employee class
    this.officeNumber = officeNumber; //References the returned data from to the getOfficeNumber method
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
