import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";

mongoose
  .connect(
    "mongodb+srv://davidikmufc:jomama1@cluster0.zzjaemm.mongodb.net/csc307?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const { name, job } = req.query;
  const filter = {};
  if (name) filter.name = name;
  if (job)  filter.job  = job;

  try {
    const list = await User.find(filter);
    res.json({ users_list: list });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Resource not found.");
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send("Resource not found.");
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
