const sqlite3 = require("sqlite3").verbose();

class MyDatabase {
  constructor() {
    this.db = null;
    this.tableName = "";
  }

  setDatabaseName(databaseName) {
    this.db = new sqlite3.Database(databaseName);
  }

  createTable(tableName) {
    this.tableName = tableName;

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
      id INTEGER PRIMARY KEY,
      username TEXT,
      password TEXT
      )`;

    this.db.serialize(() => {
      this.db.run(createTableSQL);
    });
  }

  insertData(username, password) {
    const insertDataSQL = `INSERT INTO ${this.tableName} (username, password) VALUES (?, ?)`;
    const params = [username, password];

    this.db.serialize(() => {
      this.db.run(insertDataSQL, params);
    });
  }

  retreiveDatabase(callback) {
    const retreiveDatabaseSQL = `SELECT * FROM ${this.tableName}`;

    this.db.serialize(() => {
      this.db.all(retreiveDatabaseSQL, callback);
    });
  }
}

// Print callback
function print(err, rows) {
  if (err) {
    console.error("Error:", err);
  } else {
    rows.forEach((row) => {
      console.log(row);
    });
  }
}

// Example Usage

// Create database
const userDatabase = new MyDatabase();

// Set database name
userDatabase.setDatabaseName("userDatabase.db");

// Create table
userDatabase.createTable("users");

// Insert a user
userDatabase.insertData("username", "password");

// Print
userDatabase.retreiveDatabase(print);
