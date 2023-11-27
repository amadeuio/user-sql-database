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

**1. Create a database object**

Let's first create a database object, where the all the methods will be called

```typescript
const userDatabase = new MyDatabase();
```

**2. Create an IIFE**

Since most of the methods we are going to use are asynchronous, we will call them inside an `async` IIFE (Immediately Invoked Function Expression). This is a handy way to call `async` functions, and it allows us to `await` each asynchronous operation, ensuring that one completes before moving on to the next.

```typescript
(async () => {
  // Methods will be called here ...
})();
```

**3. Create a database named "userDatabase.db"**

```typescript
await userDatabase.createDatabase("userDatabase.db");
```

**4. Create a table in the database named "users"**

```typescript
await userDatabase.createTable("users");
```

**5. Add users**

The users are objects with the following 3 properites: automatic `id`, a `username` and a `password`

```typescript
await userDatabase.addUser("username1", "password1");
await userDatabase.addUser("username2", "password2");
```

**6. Print all users**

Using the `retreiveUsers()` metod with a `print` callback

```typescript
await userDatabase.retrieveUsers(print);
```

We obtain our database

```typescript
{ id: 1, username: 'username1', password: 'password1' }
{ id: 2, username: 'username2', password: 'password2' }
```

**7. Remove a user**

```typescript
await userDatabase.removeUser("username2");
```

Indeed if we print all users again, the `username2` has been removed from the database

```typescript
{ id: 1, username: 'username1', password: 'password1' }
```
