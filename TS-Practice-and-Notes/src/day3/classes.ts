abstract class Department {
  // private id: string;
  // private name: string;
  // employees: string[] = []; // public by default
  protected employees: string[] = []; // private
  // employees: string[];

  static fiscalYear = 2022;

  constructor(protected readonly id: string, public name: string) {
    // this.employees = [];
    // can't access static member from instance
    // console.log(this.fiscalYear); 
    // fix: add the class name
    console.log(Department.fiscalYear); 
    

  }

  // abstract method only appears in abstract class
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  showEmployees() {
    console.log(
      `Total ${this.employees.length} employees: ${this.employees.join(", ")}.`
    );
  }

  static closedDepartment() {
    console.log("This department is closed.");
  }
}

Department.closedDepartment();// This department is closed.
console.log(Department.fiscalYear);// 2022

// error: cannot create an instance of an abstract class
// const accounting = new Department("d1", "Accounting");
// console.log(accounting);
// accounting.describe();

// adding an extra parameter to the describe method
// to ensure the caller is a Department instance
// const accountingCopy = { describe: accounting.describe };
// error: this context of accountingCopy is not assignable to method's this type
// accountingCopy.describe();

// fix: modify the type
// const accountingCopy2 = { name: 'Finance Department', describe: accounting.describe };
// accountingCopy2.describe();

// private and public
// accounting.addEmployee("Max");
// accounting.addEmployee("Marie");
// accounting.showEmployees();

// error: property 'employees' is private and only accessible within class 'Department'
// accounting.employees[2] = "Anna";

// readonly properties

// inheritance
// the 'extends' keyword automatically adds the properties of the superclass to the subclass
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, administrators: string[]) {
    // super has to be called first
    super(id, "IT"); // execute the superclass constructor, passing in the required parameters
    this.admins = administrators;
  }

  addEmployee(name: string) {
    if (name === 'Moss' || name === 'Roy') {
      return;
    }
    // error: property 'employees' is private and only accessible within class 'Department'
    // fix: change 'private' to 'protected'
    this.employees.push(name);
  }

  describe() {
    console.log(`IT Department - ID: ${this.id}`);
  }
}

const it = new ITDepartment("d2", ["Moss", "Roy"]);
it.describe();
it.addEmployee("Jen");
it.showEmployees();

class EnglishDepartment extends Department {
  private lastReport: string;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(latestReport: string) {
    if (!this.lastReport) { 
      throw new Error("Please pass in a valid report.");
    }
    this.addReport(latestReport);
  }

  constructor(id: string, private reports: string[]) {
    super(id, "English");
    this.lastReport = reports[0];
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  describe() {
    console.log(`English Department - ID: ${this.id}`);
  }

}

const english = new EnglishDepartment("d3", ["This is the first report."]);
// access getter, don't call getter
console.log(english.mostRecentReport); // This is the first report.
english.addReport("We are closed during the covid pandemic.");
english.mostRecentReport = "We are open again.";
console.log(english.mostRecentReport); // We are open again.


class EducationDepartment extends Department {
  private lastReport: string;
  private static instance: EducationDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found.");
  }

  set mostRecentReport(latestReport: string) {
    if (!this.lastReport) { 
      throw new Error("Please pass in a valid report.");
    }
    this.addReport(latestReport);
  }

  // use private constructor to prevent new instances
  private constructor(id: string, private reports: string[]) {
    super(id, "education");
    this.lastReport = reports[0];
  }

  static getInstance() { 
    if (EducationDepartment.instance) {
      return this.instance;
    }
    this.instance = new EducationDepartment("d4", ["This is the first report."]);
    return this.instance;
  }

  addReport(report: string) {
    this.reports.push(report);
    this.lastReport = report;
  }

  describe() {
    console.log(`education Department - ID: ${this.id}`);
  }
}

// error: cannot create an instance of a private constructor
// const education = new EducationDepartment("d4", ["This is the first report."]);
// fix:
const education = EducationDepartment.getInstance();
const education1 = EducationDepartment.getInstance();
console.log(education === education1); // true