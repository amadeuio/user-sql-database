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

const myDB = new MyDatabase("database.db");

// Create table
const tableSQL = `CREATE TABLE IF NOT EXISTS my_table (
    id INTEGER PRIMARY KEY, 
    name TEXT, 
    email TEXT
    )`;
myDB.createTable(tableSQL);

// Insert Data
const insertDataSQL = "INSERT INTO my_table (name, email) VALUES (?, ?)";
const userData = ["john_doe", "john@example.com"];
myDB.insertData(insertDataSQL, userData);

// Select data
const selectDataSQL = "SELECT * FROM my_table";
myDB.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => console.log(row));
});
