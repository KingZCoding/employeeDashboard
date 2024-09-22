let employees = [];

let nextEmployeeId = 1;

document
  .getElementById('employee-form')
  .addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('employee-name').value;
    const department = document.getElementById('employee-department').value;
    const employeeId = generateEmployeeId(nextEmployeeId);
    nextEmployeeId++;
    const role = document.getElementById('employee-role').value;

    const newEmployee = {
      name: name,
      department: department,
      employeeId: employeeId,
      role: role,
    };

    employees.push(newEmployee);

    renderEmployees();

    document.getElementById('employee-form').reset();
  });

function renderEmployees() {
  const tableBody = document.querySelector('#employee-table tbody');
  tableBody.innerHTML = '';

  employees.forEach((employee, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.department}</td>
        <td>${employee.employeeId}</td>
        <td>${employee.role}</td>
        <td>
            <button onclick="editEmployee(${index})">Edit</button>
            <button onclick="deleteEmployee(${index})">Delete</button>
        </td>
      `;
    tableBody.appendChild(row);
  });
}

function generateEmployeeId(number) {
  return number.toString().padStart(4, '0');
}

function deleteEmployee(index) {
  employees.splice(index, 1);
  renderEmployees();
}

function editEmployee(index) {
  const employee = employees[index];
  document.getElementById('employee-name').value = employee.name;
  document.getElementById('employee-department').value = employee.department;
  document.getElementById('employee-id').value = employee.employeeId;
  document.getElementById('employee-role').value = employee.role;

  //   deleteEmployee(index);
}

function saveEdit() {
  const employeeId = document.getElementById('employee-id').value;
  const newEmployeeDepartment = document.getElementById(
    'employee-department'
  ).value;
  const newEmployeeName = document.getElementById('employee-name').value;
  console.log(employeeId);
  employees = employees.map(employee =>
    employee.employeeId === employeeId
      ? {
          ...employee,
          name: newEmployeeName,
          department: newEmployeeDepartment,
        }
      : employee
  );
  renderEmployees();
  console.log(employees);
}

document.getElementById('random-roles').addEventListener('click', function () {
  const roles = ['Developer', 'Engineer', 'Support'];

  const shuffledRoles = [...roles].sort(() => -Math.random());
  employees.forEach(employee => {
    employee.role = shuffledRoles[index % shuffledRoles.length];
  });
  renderEmployees();
});

document
  .getElementById('clear-employees')
  .addEventListener('click', function () {
    employees = [];
    renderEmployees();
  });
