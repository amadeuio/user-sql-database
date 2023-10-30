const sqlite3 = require("sqlite3").verbose(); // Import SQLite in Node.js enviroment
const db = new sqlite3.Database("database.db"); // Create new database

// Create table named my_table with columns 'id', 'name', and 'email'
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY, name TEXT, email TEXT)");
});

// Insert data
db.serialize(() => {
  const stmt = db.prepare("INSERT INTO my_table (name, email) VALUES (?, ?)"); // Data entry 'recipe'
  stmt.run("John", "john@example.com"); // Specific data entry
  stmt.finalize();
});

// Query data
db.all("SELECT * FROM my_table", (err, rows) => {
  if (err) {
    throw err;
  }

  // rows is a list of objects representing each data row
  rows.forEach((row) => {
    console.log(row);
  });
});

// Close the database connection
db.close();
