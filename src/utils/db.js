import mysql from 'mysql';
import CONFIG from '../config';

// Create a connection to the database
const connection = mysql.createConnection({
    host: CONFIG.DB.HOST,
    user: CONFIG.DB.USER,
    password: CONFIG.DB.PASSWORD,
    database: CONFIG.DB.DATABASE,
});

// open the MySQL connection
connection.connect((error) => {
    if (error) throw error;
    console.log('Successfully connected to the database.');
});

module.exports = connection;
