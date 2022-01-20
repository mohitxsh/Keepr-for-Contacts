//importing express package
const express = require("express");
//assigning express to app variable
const app = express();
//import mongoDB connection files
const connectDB = require("./config/db");

//Calling the database connection method
connectDB();

//Middleware (required so that we can use the req.body)
app.use(express.json({ extended: false }));

//route
app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the contact manager API" })
);

//Defining routes
//we will use express's router method
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/auth", require("./routes/auth"));

//first PORT var will be in looked up in an environment variable
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
