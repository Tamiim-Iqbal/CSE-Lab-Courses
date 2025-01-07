const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // Default XAMPP user
  password: '',       // Default XAMPP password is empty
  database: 'triptrack',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

//Endpoint to handle form submission
app.post('/submit-users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      res.send('Data inserted successfully');
    }
  });
});

//bookings
app.post('/submit-bookings', (req, res) => {
    const {PackageId, UserEmail, FromDate, ToDate, Comment} = req.body;
    const sql = 'INSERT INTO bookings (PackageId, UserEmail, FromDate, ToDate, Comment) VALUES (?, ?, ?, ?, ?)';
    
    db.query(sql, [PackageId, UserEmail, FromDate, ToDate, Comment], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error inserting data');
      } else {
        res.send('Data inserted successfully');
      }
    });
  });



//quiry
app.post('/submit-quiry', (req, res) => {
  const {EmailId, Message} = req.body;
  const sql = 'INSERT INTO quiry (EmailId, Message) VALUES (?, ?)';
  
  db.query(sql, [EmailId, Message], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error inserting data');
    } else {
      res.send('Data inserted successfully');
    }
  });
});

//delete
app.delete('/delete-booking/:package_id', (req, res) => {
  const { package_id } = req.params;  // Get package_id from the URL parameters

  // Validate package_id (it should be a valid number)
  if (isNaN(package_id) || parseInt(package_id) <= 0) {
      return res.status(400).json({ message: 'Invalid package ID' });
  }

  // SQL query to delete the booking record
  const sql = 'DELETE FROM bookings WHERE PackageId = ?';

  // Execute the query
  db.query(sql, [package_id], (err, result) => {
      if (err) {
          console.error('Error deleting data from database:', err);
          return res.status(500).json({ message: 'Error deleting booking from the database' });
      }

      // Check if the record was deleted (if affectedRows is 0, no record found)
      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Booking not found' });
      }

      // Return success message if the record is deleted
      return res.status(200).json({ message: 'Booking deleted successfully' });
  });
});


//get
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});