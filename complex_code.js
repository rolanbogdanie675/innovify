/*
   Filename: complex_code.js

   This code demonstrates a complex implementation of a scheduling system for a company.
   It includes features such as creating employees, assigning tasks, tracking progress, and generating reports.
   The code is written in an object-oriented style and utilizes various design patterns for flexibility and scalability.

   Author: Your Name
   Date: Today's Date
*/

// Employee class represents a single employee
class Employee {
  constructor(name, role) {
    this.name = name;
    this.role = role;
    this.tasks = [];
  }

  assignTask(task) {
    this.tasks.push(task);
  }

  completeTask(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }

  getTasks() {
    return this.tasks;
  }
}

// Task class represents a single task with details
class Task {
  constructor(id, title, description, deadline) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completed = false;
  }

  markComplete() {
    this.completed = true;
  }
}

// Scheduler class manages the scheduling system
class Scheduler {
  constructor() {
    this.employees = [];
    this.tasks = [];
  }

  createEmployee(name, role) {
    const employee = new Employee(name, role);
    this.employees.push(employee);
    return employee;
  }

  createTask(title, description, deadline) {
    const id = this.tasks.length + 1;
    const task = new Task(id, title, description, deadline);
    this.tasks.push(task);
    return task;
  }

  assignTaskToEmployee(task, employee) {
    employee.assignTask(task);
  }

  completeTask(taskId) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].markComplete();
      this.employees.forEach(employee => {
        employee.completeTask(taskId);
      });
    }
  }

  generateTaskReport() {
    let report = 'Task Report:\n\n';
    this.tasks.forEach(task => {
      report += `Title: ${task.title}\n`;
      report += `Description: ${task.description}\n`;
      report += `Deadline: ${task.deadline}\n`;
      report += `Status: ${task.completed ? 'Completed' : 'Pending'}\n\n`;
    });
    return report;
  }
}

// Example usage
const scheduler = new Scheduler();

const john = scheduler.createEmployee('John Doe', 'Developer');
const jane = scheduler.createEmployee('Jane Smith', 'Designer');

const task1 = scheduler.createTask('Implement login feature', 'Write code to allow users to log in', '2022-01-10');
const task2 = scheduler.createTask('Design homepage layout', 'Create a visually appealing design for the homepage', '2022-01-15');

scheduler.assignTaskToEmployee(task1, john);
scheduler.assignTaskToEmployee(task2, jane);

scheduler.completeTask(1);

console.log(scheduler.generateTaskReport());

// Output:
/*
   Task Report:

   Title: Implement login feature
   Description: Write code to allow users to log in
   Deadline: 2022-01-10
   Status: Completed

   Title: Design homepage layout
   Description: Create a visually appealing design for the homepage
   Deadline: 2022-01-15
   Status: Pending
*/