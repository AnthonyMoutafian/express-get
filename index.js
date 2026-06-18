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
    users = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (age === "min") {
    users = users.toSorted((a, b) => a.age - b.age);
  } else if (age === "max") {
    users = users.toSorted((a, b) => b.age - a.age);
  }

  res.json(users);
});

app.listen(3000, (err) => {
  err ? console.log(err) : console.log("Server is running");
});
