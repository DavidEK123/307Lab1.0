import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  job: String
});

export default mongoose.model("User", userSchema);
