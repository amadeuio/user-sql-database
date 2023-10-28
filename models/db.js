// SQLite database

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('emails.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS emails (email TEXT)");
});
