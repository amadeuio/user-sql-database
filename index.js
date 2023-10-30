const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("database.db");

// Create a table
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY, name TEXT)");
});

// Insert data
db.serialize(() => {
  const stmt = db.prepare("INSERT INTO my_table (name) VALUES (?)");
  stmt.run("John");
  stmt.finalize();
});

// Query data
db.all("SELECT * FROM my_table", (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

// Close the database connection
db.close();
