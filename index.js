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
    const studentResultsCollection = db.collection("studentResultsCollection");

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

    //post admission-form
    app.post("/admission-form", async (req, res) => {
      const admissionFormData = req.body;
      console.log(req.body);
      const result = await admissionFormCollection.insertOne(admissionFormData);
      res.send(result);
    });

    // get all admission-form
    app.get("/admission-form", async (req, res) => {
      const allAdmissionFormData = admissionFormCollection.find();
      const result = await allAdmissionFormData.toArray();
      res.send(result);
    });

    // get single admission-form
    app.get("/admission-form/:id", async (req, res) => {
      const id = req.params.id;
      const admissionData = await admissionFormCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(admissionData);
    });

    // Update single admission-form
    app.put("/admission-form/:id", async (req, res) => {
      const id = req.params.id;
      const updatedStudentForm = req.body;
      console.log(id, updatedStudentForm);
      const result = await admissionFormCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedStudentForm }
      );
      res.send(result);
    });

    // delete single admissionForm
    app.delete("/admission-form/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const result = await admissionFormCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    // Student Report

    // get all admission-form
    app.get("/student-results", async (req, res) => {
      const allStudentReportData = studentResultsCollection.find();
      const result = await allStudentReportData.toArray();
      res.send(result);
    });

    // get single student report by type
    // api example : GET http://localhost:5000/student-results/report?id=2&reportType="Half Year Report"
    app.get("/student-results/report", async (req, res) => {
      const { id, reportType } = req.query;
      console.log(id, reportType);
      const reportData = await studentResultsCollection.findOne({
        studentId: id,
        reportType: reportType,
      });
      res.send(reportData);
    });

    // Get multiple student reports by matching studentId
    app.get("/student-results-all/:id", async (req, res) => {
      const id = req.params.id;
      try {
        // Find all documents where studentId matches the provided id
        const reportData = await studentResultsCollection
          .find({ studentId: id })
          .toArray();

        // Send the array of matching documents as the response
        res.send(reportData);
      } catch (err) {
        // Handle errors
        res.status(500).send({ error: "Failed to fetch student results" });
      }
    });

    // Endpoint to add student results
    app.post("/student-results", async (req, res) => {
      try {
        const resultData = req.body; // Data sent from the frontend
        console.log("Received student result data:", resultData);
        const result = await studentResultsCollection.insertOne(resultData); // Insert into the collection
        res.send(result);
      } catch (error) {
        console.error("Error saving student result:", error);
        res.status(500).send({ error: "Failed to save student result" });
      }
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
