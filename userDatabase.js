const sqlite3 = require("sqlite3").verbose();

class MyDatabase {
  constructor(databaseName) {
    this.db = new sqlite3.Database(databaseName);
  }

  createTable(sql) {
    this.db.serialize(() => {
      this.db.run(sql);
    });
  }

  insertData(sql, params) {
    const stmt = this.db.prepare(sql);
    stmt.run(params);
    stmt.finalize();
  }

  selectData(sql, params, callback) {
    this.db.all(sql, params, (err, rows) => {
      if (err) {
        console.error(`Error selecting data: ${err.message}`);
      } else {
        callback(rows);
      }
    });
  }
}

// Example Usage

const userDatabase = new MyDatabase("userDatabase.db");

// Create table
const tableSQL = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY, 
    name TEXT NOT NULL, 
    email TEXT NOT NULL
    )`;
userDatabase.createTable(tableSQL);

// Insert Data
const insertDataSQL = "INSERT INTO users (name, email) VALUES (?, ?)";
const userData = ["john_doe", "john@example.com"];
userDatabase.insertData(insertDataSQL, userData);

// Select data
const selectDataSQL = "SELECT * FROM users";
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => console.log(row));
});
