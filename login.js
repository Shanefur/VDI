// login.js

// Initialize the 'users' array from local storage on page load
let users = JSON.parse(localStorage.getItem('users')) || [];

// Function to authenticate user login
const login = () => {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    alert('Login successful!');

    // Save the user information to local storage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Redirect to index.html after successful login
    window.location.href = 'index.html';
  } else {
    alert('Invalid username or password. Please try again.');
  }
};

// Function to handle user signup
const signup = () => {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  // Check if the username already exists
  const userExists = users.some(u => u.username === username);

  if (userExists) {
    alert('Username already exists. Please choose a different username.');
  } else {
    // Add the new user to the in-memory array
    const newUser = { username, password };
    users.push(newUser);

    // Save the updated 'users' array to local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Save the current user to local storage
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert('Signup successful! You can now log in.');
  }
};

// On page load, check if there is a current user in local storage
window.onload = () => {
  const storedUser = localStorage.getItem('currentUser');
  if (storedUser) {
    // Parse the stored user information
    const currentUser = JSON.parse(storedUser);
    // You can use the currentUser object as needed
    console.log('Logged in user:', currentUser);
  }
};
