const sqlite3 = require("sqlite3").verbose();

class MyDatabase {
  constructor() {
    this.db = null;
    this.tableName = "";
  }

  async createDatabase(databaseName) {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(databaseName, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async createTable(tableName) {
    this.tableName = tableName;

    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS ${this.tableName} (
        id INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT
      )`;

    try {
      await this.runQuery(createTableSQL);
    } catch (err) {
      console.error("Error creating table:", err);
    }
  }

  async addUser(username, password) {
    const addUserSQL = `INSERT INTO ${this.tableName} (username, password) VALUES (?, ?)`;
    const params = [username, password];

    try {
      await this.runQuery(addUserSQL, params);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  }

  async retrieveUsers(callback) {
    const retrieveUsersSQL = `SELECT * FROM ${this.tableName}`;

    try {
      const rows = await this.allQuery(retrieveUsersSQL);
      callback(rows);
    } catch (err) {
      console.error("Error retrieving users:", err);
    }
  }

  // Queries

  async runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this);
        }
      });
    });
  }

  async allQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

// Print callback
function print(rows) {
  rows.forEach((row) => {
    console.log(row);
  });
}

// Example Usage
(async () => {
  const userDatabase = new MyDatabase();
  await userDatabase.createDatabase("userDatabase.db");
  await userDatabase.createTable("users");
  await userDatabase.addUser("username", "password");
  await userDatabase.retrieveUsers(print);
})();
