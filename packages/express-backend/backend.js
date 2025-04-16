import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

const filterUsers = (query) => {
  let filtered = users.users_list;
  if (query.name) {
    filtered = filtered.filter((user) => user.name === query.name);
  }
  if (query.job) {
    filtered = filtered.filter((user) => user.job === query.job);
  }
  return filtered;
};

app.get("/users", (req, res) => {
  if (Object.keys(req.query).length > 0) {
    res.send({ users_list: filterUsers(req.query) });
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users.users_list.find((user) => user.id === id);

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);
  if (!result) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (!userToAdd.id) {
    userToAdd.id = Math.random().toString(36).substring(2, 9);
  }
  addUser(userToAdd);
  res.status(201).json(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = users.users_list.length;
  users.users_list = users.users_list.filter((user) => user.id !== id);
  if (users.users_list.length === initialLength) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
