$(document).ready(init);

let employees = [];
let monthlyBudget = 20000;

function init() {
  console.log("hello");
  $(".employee_entry_form").on("submit", formSubmit);
  $(".table_body").on("click", ".btn_delete", deleteRow);
  $(".budget_button").on("click", changeBudget);
} // end Init Function

function changeBudget() {
  monthlyBudget = $("#budget").val();
  if (monthlyBudget === "") {
    monthlyBudget = 20000;
  } // end If
  $("#budget").val("");
  $(".new_monthly_budget").text(`The new Monthly Budget: $${monthlyBudget}`);
} // end changeBudget Function

function deleteRow() {
  const employeeIndex = $(this).data("index");

  employees.splice(employeeIndex, 1);
  render();
} // end deleteRow Function

function formSubmit(event) {
  event.preventDefault();

  let employee = {
    employeeFirstName: $("#employee_first_name").val(),
    employeeLastName: $("#employee_last_name").val(),
    idNumber: $("#id_number").val(),
    jobTitle: $("#job_title").val(),
    annualSalary: parseInt($("#annual_salary").val())
  };

  employees.push(employee);
  $("#employee_first_name").val("");
  $("#employee_last_name").val("");
  $("#id_number").val("");
  $("#job_title").val("");
  $("#annual_salary").val("");
  render();
} // End formSubmit Function

function render() {
  $(".table_body").empty();

  let yearlyCost = 0;

  for (i = 0; i < employees.length; i++) {
    let eachEmployee = employees[i];

    yearlyCost += eachEmployee.annualSalary;
    $(".table_body").append(`
    <tr>
      <td>${eachEmployee.employeeFirstName}</td>
      <td>${eachEmployee.employeeLastName}</td>
      <td>${eachEmployee.idNumber}</td>
      <td>${eachEmployee.jobTitle}</td>
      <td>$${eachEmployee.annualSalary}</td>
      <td><button class="btn_delete" data-index="${i}">Delete</button></td>
    </tr>
    `);
  } // End For
  let monthlyCost = yearlyCost / 12;
  monthlyCost = monthlyCost.toFixed(2);
  $(".total_monthly_expenses").text(`$${monthlyCost}`);
  if (monthlyCost > monthlyBudget) {
    $(".monthly_expenses").css("background", "red");
  } // End if
  else {
    $(".monthly_expenses").css("background", "cornflowerblue");
  } // End else
} // End render Function
