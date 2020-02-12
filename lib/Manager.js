var Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, email, id, office) {
        super(name, email, id)
        this.officeNumber = office;
    }
    getOfficeNumber() { 
        return this.officeNumber };
    getRole(){
        return "Manager";
    }
}



module.exports = Manager;
