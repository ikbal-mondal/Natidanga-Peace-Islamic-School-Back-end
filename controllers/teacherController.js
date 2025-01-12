const { connectToDatabase } = require("../config/dbConfig");

const addTeacher = async (req, res) => {
  const { name, phone, email } = req.body;
  try {
    const db = await connectToDatabase();
    const result = await db.collection("teachers").insertOne({ name, phone, email });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to add teacher" });
  }
};

const getTeachers = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const teachers = await db.collection("teachers").find({}).toArray();
    console.log("get Teacher");
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch teachers" });
  }
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, phone, email } = req.body;
  try {
    const db = await connectToDatabase();
    const result = await db.collection("teachers").updateOne(
      { _id: new require("mongodb").ObjectId(id) },
      { $set: { name, phone, email } }
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to update teacher" });
  }
};

const deleteTeacher = async (req, res) => {
  const { _id } = req.params;
  try {
    const db = await connectToDatabase();
    const result = await db.collection("teachers").deleteOne({ _id: new require("mongodb").ObjectId(_id) });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete teacher" });
  }
};

module.exports = { addTeacher, getTeachers, updateTeacher, deleteTeacher };


