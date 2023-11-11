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
    this.db.serialize(() => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.error(`Error deleting data: ${err.message}`);
        } else {
          console.log(`Row(s) deleted: ${this.changes}`);
        }
      });
    });
  }
}

// Example Usage

const userDatabase = new MyDatabase("userDatabase.db");

// SQL Statements for usernames and passwords
const createTableSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT,
    password TEXT
  )
`;

const insertDataSQL = "INSERT INTO users (username, password) VALUES (?, ?)";
const selectDataSQL = "SELECT * FROM users";
const updateDataSQL = "UPDATE users SET password = ? WHERE username = ?";
const deleteDataSQL = "DELETE FROM users WHERE username = ?";

// Create a table
userDatabase.createTable(createTableSQL);

// Insert data (username and password)
userDatabase.insertData(insertDataSQL, ["username1", "password1"]);
userDatabase.insertData(insertDataSQL, ["username2", "password2"]);

// Select and display data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});

// Update password for a user
userDatabase.updateData(updateDataSQL, ["updatedpass", "username1"]);

// Select and display updated data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});

// Delete data (user)
userDatabase.deleteData(deleteDataSQL, ["username1"]);

// Select and display remaining data
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => {
    console.log(row);
  });
});
