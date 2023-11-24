![languages](https://img.shields.io/badge/languages-ts-blue)
![license](https://img.shields.io/badge/license-MIT-green)

# User Database 📋👤

### Description 📚

This repo features a user database class implemented in JavaScript and SQLite. It contains various methods to easily perform typical database operations, like adding or removing users and more.

### Features ✨

### Methods 🔧

- `addUser()`: Adds a user with a username and a password to the database.

- `removeUser()`: Removes a user from the database.

### Getting Started 🏁

#### Prerequisites

- Node.js installed on your system
- npm (Node Package Manager) installed on your system

#### Installation

1. Clone the repository to your local machine:

```sh
git clone git@github.com:nightrunner4/sql-storage.git
```

2. Navigate to the project directory:

```sh
cd sql-storage
```

3. Install the project dependencies (in this case, sqlite, as specified in [package.json](./package.json)):

```sh
npm install
```

### Usage 🖊️

**1. Create a database**

```typescript
const userDatabase = new MyDatabase();
await userDatabase.createDatabase("userDatabase.db");
```

**2. Create a table in the database named "users"**

```typescript
await userDatabase.createTable("users");
```
