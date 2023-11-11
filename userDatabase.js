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
    this.db.serialize(() => {
      const stmt = this.db.prepare(sql);
      stmt.run(params);
      stmt.finalize();
    });
  }

  selectData(sql, params, callback) {
    this.db.serialize(() => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.error(`Error selecting data: ${err.message}`);
        } else {
          callback(rows);
        }
      });
    });
  }

  updateData(sql, params) {
    this.db.serialize(() => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.error(`Error updating data: ${err.message}`);
        } else {
          console.log(`Row(s) updated: ${this.changes}`);
        }
      });
    });
  }

  deleteData(sql, params) {
    this.db.run(sql, params, function (err) {
      if (err) {
        console.error(`Error deleting data: ${err.message}`);
      } else {
        console.log(`Row(s) deleted: ${this.changes}`);
      }
    });
  }
}

// Example Usage

const userDatabase = new MyDatabase("userDatabase.db");

// SQL Statements
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    email TEXT
  )
`;

const insertDataSQL = "INSERT INTO users (username, email) VALUES (?, ?)";
const selectDataSQL = "SELECT * FROM users";
const updateDataSQL = "UPDATE users SET email = ? WHERE username = ?";
const deleteDataSQL = "DELETE FROM users WHERE username = ?";

// Create a table
userDatabase.createTable(createTableSQL);

// Insert data
userDatabase.insertData(insertDataSQL, ["john_doe", "john@example.com"]);
userDatabase.insertData(insertDataSQL, ["jane_smith", "jane@example.com"]);

// Select and display data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});

// Update data
userDatabase.updateData(updateDataSQL, ["updated_email@example.com", "john_doe"]);

// Select and display updated data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});

// Delete data
userDatabase.deleteData(deleteDataSQL, ["john_doe"]);

// Select and display remaining data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});
