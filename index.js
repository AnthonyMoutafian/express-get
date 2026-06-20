const express = require("express");
const fs = require("fs").promises;
const { createPath } = require("./helpers");

const app = express();

app.get("/users", async (req, res) => {
  const { age, name } = req.query;

  let users = JSON.parse(
    await fs.readFile(createPath("db", "users.json"), "utf-8"),
  );

  if (name) {
    const filteredNameUsers = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );

    res.json(filteredNameUsers);
    return;
  }

  if (age === "min") {
    const filteredMinUsers = users.toSorted((a, b) => a.age - b.age);
    res.json(filteredMinUsers);
    return;
  } else if (age === "max") {
    const filteredMaxUsers = users.toSorted((a, b) => b.age - a.age);
    res.json(filteredMaxUsers);
    return;
  }

  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  let users = JSON.parse(
    await fs.readFile(createPath("db", "users.json"), "utf-8"),
  );

  const { id } = req.params;

  res.json(users.find((user) => user.id === +id));
});

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("Server is running");
});
