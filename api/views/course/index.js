/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-console */

const tbody = document.querySelector('#tableBody');
const modal = document.querySelector('.modal-wrapper');
const courseName = document.querySelector('.cName');
const courseSubject = document.querySelector('.cSubject');
const inputField = document.querySelector('#input-field');
const del = document.querySelector('#del');
let method = null;
let id = -1;

/**
 * Toggle the Modal
 */
function toggle() {
  if (modal.style.display === 'flex') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'flex';
  }
}

/**
 *  GET REQUEST Function and call
 */
(async function getData() {
  const res = await fetch('http://localhost:5000/course');
  const data = await res.json();
  Object.keys(data).forEach((key) => {
    const templateRow = document.createElement('tr');
    templateRow.setAttribute('id', `${data[key].courseID}`);
    templateRow.innerHTML = `<td> ${data[key].courseName} </td>
    <td> ${data[key].subject} </td>
    <td><button type="button" class="btn btn-outline-dark" onclick="putModal( ${data[key].courseID} )"><i class="fas fa-pen"></i></button>
    <i class="fas fa-grip-lines-vertical"></i>
    <button type="button" class="btn btn-outline-dark" onclick="deleteModal( ${data[key].courseID} )"></i><i class="fas fa-trash-alt"></i></button></td>`;
    tbody.appendChild(templateRow);
  });
}());

/**
 *  POST REQUEST Function and Modal
 */
function postModal() {
  inputField.style.display = 'block';
  del.style.display = 'none';
  courseName.value = '';
  courseSubject.value = '';
  method = 'POST';
  toggle();
}

async function postData() {
  const url = 'http://localhost:5000/course';
  const data = {
    courseName: courseName.value,
    subject: courseSubject.value,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const newID = await res.json();
  const templateRow = document.createElement('tr');
  templateRow.setAttribute('id', `${newID.cID}`);
  templateRow.innerHTML = `<td> ${courseName.value} </td>
    <td> ${courseSubject.value} </td>
    <td><button type="button" class="btn btn-outline-dark" onclick="putModal( ${newID.cID} )"><i class="fas fa-pen"></i></button>
    <i class="fas fa-grip-lines-vertical"></i>
    <button type="button" class="btn btn-outline-dark" onclick="deleteModal( ${newID.cID} )"></i><i class="fas fa-trash-alt"></i></button></td>`;
  tbody.appendChild(templateRow);
  toggle();
}

/**
 *  PUT REQUEST Function and Modal
 */
function putModal(courseID) {
  id = courseID;
  inputField.style.display = 'block';
  del.style.display = 'none';
  const updateRow = document.getElementById(`${id}`);

  courseName.value = updateRow.children[0].innerText;
  courseSubject.value = updateRow.children[1].innerText;
  method = 'PUT';
  toggle();
}

async function putData() {
  const url = `http://localhost:5000/course/${id}`;
  const data = {
    courseName: courseName.value,
    subject: courseSubject.value,
  };
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(() => {
    const updateRow = document.getElementById(`${id}`);
    updateRow.children[0].innerText = courseName.value;
    updateRow.children[1].innerText = courseSubject.value;
    toggle();
  }).catch((error) => {
    console.log(error);
  });
}

/**
 *  DELETE REQUEST Function and Modal
 */
function deleteModal(courseID) {
  id = courseID;
  inputField.style.display = 'none';
  del.style.display = 'block';
  method = 'DELETE';
  toggle();
}

async function deleteData() {
  const url = `http://localhost:5000/course/${id}`;
  try {
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: null,
    });
    const updateRow = document.getElementById(`${id}`);
    tbody.removeChild(updateRow);
    toggle();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Handler function for HTTP REQUESTS
 */
function handler() {
  if (method === 'PUT') {
    putData();
  } else if (method === 'DELETE') {
    deleteData();
  } else if (method === 'POST') {
    postData();
  }
}
