const sqlite3 = require("sqlite3").verbose();

class MyDatabase {
  constructor(databaseName) {
    this.db = new sqlite3.Database(databaseName);
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS my_table (id INTEGER PRIMARY KEY, name TEXT, email TEXT)"
      );
    });
  }

  insertData(name, email) {
    const stmt = this.db.prepare("INSERT INTO my_table (name, email) VALUES (?, ?)");
    stmt.run(name, email);
    stmt.finalize();
  }

  queryData(callback) {
    this.db.all("SELECT * FROM my_table", (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

module.exports = MyDatabase;

// Usage

const myDB = new MyDatabase("database.db");

myDB.insertData("John Doe", "john@example.com");

myDB.queryData((err, data) => {
  if (err) {
    console.error("Error querying data:", err);
  }

  data.forEach((row) => {
    console.log(row);
  });
});
