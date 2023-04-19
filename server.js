const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'worldline'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }

  console.log('Connected to database');
});


app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
      <h1>Student Management App</h1>
      <p>Welcome to the student management app. Please fill out the form below to submit your details.</p>
      <form method="POST" action="/submit">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName"><br>
  
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName"><br>
  
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"><br>
  
        <label for="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber"><br>
  
        <label for="dob">Date of Birth:</label>
        <input type="date" id="dob" name="dob"><br>
  
        <label for="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select><br>
  
        <label for="address1">Address Line 1:</label>
        <input type="text" id="address1" name="address1"><br>
  
        <label for="address2">Address Line 2:</label>
        <input type="text" id="address2" name="address2"><br>
  
        <label for="city">City:</label>
        <input type="text" id="city" name="city"><br>
  
        <label for="state">State:</label>
        <input type="text" id="state" name="state"><br>
  
        <label for="zipcode">Zipcode:</label>
        <input type="text" id="zipcode" name="zipcode"><br>
  
        <label for="country">Country:</label>
        <input type="text" id="country" name="country"><br>
  
        <button type="submit">Submit</button>
      </form>
    `);
  });
  

app.post('/submit', (req, res) => {
  const { firstName, lastName, email, phone, dob, gender, address1, address2, city, state, zipcode, country } = req.body;
  const sql = `
    INSERT INTO students (fname, lname, email, phoneno, dob, gender, address_l1, address_l2, city, state, zipcode, country)
    VALUES ('${firstName}', '${lastName}', '${email}', '${phone}', '${dob}', '${gender}', '${address1}', '${address2}', '${city}', '${state}', '${zipcode}', '${country}')
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error inserting student: ', err);
      res.send('Error submitting student details. Please try again.');
      return;
    }

    res.send(`
      <h1>Student Details Submitted</h1>
      <p>First Name: ${firstName}</p>
      <p>Last Name: ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Phone Number: ${phone}</p>
      <p>Date of Birth: ${dob}</p>
      <p>Gender: ${gender}</p>
      <p>Address Line 1: ${address1}</p>
      <p>Address Line 2: ${address2}</p>
      <p>City: ${city}</p>
      <p>State: ${state}</p>
      <p>Zipcode: ${zipcode}</p>
      <p>Country: ${country}</p>
    `);
  });});
