const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster-natidanga-peace.e6ueg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Natidanga-Peace-Islamic-School`;
const PORT = process.env.PORT || 5000;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  useUnifiedTopology: true,
});


async function connectToDatabase() {
    try {
      // Connect the client to the server
      await client.connect();
  
      console.log("You successfully connected to MongoDB!");
  
      const db = client.db("NatidangaSchoolDB");
      return db;
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }

module.exports = { connectToDatabase };
