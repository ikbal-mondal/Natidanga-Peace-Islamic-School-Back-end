const express = require("express");
const { ObjectId } = require("mongodb");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-natidanga-peace.e6ueg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Natidanga-Peace-Islamic-School`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("You successfully connected to MongoDB!");

    const db = client.db("NatidangaSchoolDB");
    const teachersCollection = db.collection("teachersCollection");
    const admissionFormCollection = db.collection("admissionFormCollection");

    // teachers route

    //post single teacher
    app.post("/teachers", async (req, res) => {
      const teacherData = req.body;
      const result = await teachersCollection.insertOne(teacherData);
      res.send(result);
    });

    // get all teachers
    app.get("/teachers", async (req, res) => {
      const teachersData = teachersCollection.find();
      const result = await teachersData.toArray();
      res.send(result);
    });

    // get single teacher
    app.get("/teachers/:id", async (req, res) => {
      const id = req.params.id;
      const teacherData = await teachersCollection.findOne({
        _id: new ObjectId(id),
      });

      res.send(teacherData);
    });

    // Update single teacher
    app.put("/teachers/:id", async (req, res) => {
      const id = req.params.id;
      const updatedTeacher = req.body;
      const result = await teachersCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedTeacher }
      );
      res.send(result);
    });

    // delete single teacher
    app.delete("/teachers/:id", async (req, res) => {
      const id = req.params.id;
      const result = await teachersCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });



    // admissionForm routes

    //post admissionForm
    app.post("/admission-form", async (req, res) => {
      const admissionFormData = req.body;
      console.log(req.body);
      const result = await admissionFormCollection.insertOne(admissionFormData);
      res.send(result);
    });


    // get all admissionForm
    app.get("/admission-form", async (req, res) => {
      const allAdmissionFormData = admissionFormCollection.find();
      const result = await allAdmissionFormData.toArray();
      res.send(result);
    });









  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running...");
});

app.listen(PORT, (req, res) => {
  console.log("App is listen on port ", PORT);
});
