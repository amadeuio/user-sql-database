const sqlite3 = require("sqlite3").verbose();

class MyDatabase {
  constructor() {
    this.db = null;
    this.tableName = "";
  }

  // Create a new SQLite database with a name
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

  // Create a table in the database with a name
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

  // Add a user to the table
  async addUser(username, password) {
    const addUserSQL = `INSERT INTO ${this.tableName} (username, password) VALUES (?, ?)`;
    const params = [username, password];

    try {
      await this.runQuery(addUserSQL, params);
    } catch (err) {
      console.error("Error adding user:", err);
    }
  }

  // Remove a user from the table
  async removeUser(username) {
    const removeUserSQL = `DELETE FROM ${this.tableName} WHERE username = ?`;
    const params = [username];

    try {
      await this.runQuery(removeUserSQL, params);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  }

  // Retrieve a specific user from the table
  async retrieveUser(username) {
    const retrieveUserSQL = `SELECT * FROM ${this.tableName} WHERE username = ?`;
    const params = [username];

    try {
      const user = await this.allQuery(retrieveUserSQL, params);
      if (user && user.length > 0) {
        return user[0];
      } else {
        console.log("User not found.");
        return null;
      }
    } catch (err) {
      console.error("Error retrieving user:", err);
      return null;
    }
  }

  // Retrieve all users and pass thru a callback
  async retrieveUsers(callback) {
    const retrieveUsersSQL = `SELECT * FROM ${this.tableName}`;

    try {
      const rows = await this.allQuery(retrieveUsersSQL);
      callback(rows);
    } catch (err) {
      console.error("Error retrieving users:", err);
    }
  }

  // Change username for a specific user
  async changeUsername(username, newUsername) {
    const changeUsernameSQL = `UPDATE ${this.tableName} SET username = ? WHERE username = ?`;
    const params = [newUsername, username];

    try {
      await this.runQuery(changeUsernameSQL, params);
    } catch (err) {
      console.error("Error changing username:", err);
    }
  }

  // Change password for a specific user
  async changePassword(username, newPassword) {
    const changePasswordSQL = `UPDATE ${this.tableName} SET password = ? WHERE username = ?`;
    const params = [newPassword, username];

    try {
      await this.runQuery(changePasswordSQL, params);
    } catch (err) {
      console.error("Error changing password:", err);
    }
  }

  // Clear the entire database table
  async clearDatabase() {
    const clearDatabaseSQL = `DELETE FROM ${this.tableName}`;

    try {
      await this.runQuery(clearDatabaseSQL);
    } catch (err) {
      console.error("Error clearing database:", err);
    }
  }

  // Close the database connection
  async closeDatabase() {
    if (this.db) {
      return new Promise((resolve, reject) => {
        this.db.close((err) => {
          if (err) {
            reject(err);
          } else {
            console.log("Database closed successfully.");
            resolve();
          }
        });
      });
    } else {
      console.log("No database connection to close.");
    }
  }

  // Execute SQL run query with a statement and params
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

  // Execute SQL all query with a statement and params
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
  // Create database
  const userDatabase = new MyDatabase();
  await userDatabase.createDatabase("userDatabase.db");
  await userDatabase.createTable("users");

  // Clear existing database
  await userDatabase.clearDatabase();

  // Add users
  await userDatabase.addUser("username1", "password1");
  await userDatabase.addUser("username2", "password2");

  // Print all users
  await userDatabase.retrieveUsers(print);

  // Remove user
  //await userDatabase.removeUser("username2");

  // Retreive user
  //console.log(await userDatabase.retrieveUser("username1"));

  // Change username
  await userDatabase.changeUsername("username1", "newUsername");

  // Change password
  await userDatabase.changePassword("username2", "newPassword");

  // Print all users
  await userDatabase.retrieveUsers(print);

  // Close database
  await userDatabase.closeDatabase();
})();
