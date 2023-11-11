import sqlite3, { Database } from "sqlite3";

class MyDatabase {
  db: Database;

  constructor(databaseName: string) {
    this.db = new sqlite3.Database(databaseName);
  }

  createTable(sql: string): void {
    this.db.serialize(() => {
      this.db.run(sql);
    });
  }

  insertData(sql: string, params: any[]): void {
    const stmt = this.db.prepare(sql);
    stmt.run(params);
    stmt.finalize();
  }

  selectData(sql: string, params: any[], callback: (rows: any[]) => void): void {
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
const userData: any[] = ["john_doe", "john@example.com"];
userDatabase.insertData(insertDataSQL, userData);

// Select data
const selectDataSQL = "SELECT * FROM users";
userDatabase.selectData(selectDataSQL, [], (rows) => {
  rows.forEach((row) => console.log(row));
});
