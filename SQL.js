// Initialize SQL.js
const initSqlJs = window.initSqlJs;
const SQL = await initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
});

// Create a new database
const db = new SQL.Database();

// Create users table
db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)");

// Insert a user
db.run("INSERT INTO users VALUES (?, ?, ?, ?)", [1, "Mohit", "test@example.com", "password123"]);