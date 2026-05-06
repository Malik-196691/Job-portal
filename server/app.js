require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/users");
const applicationRoutes = require("./routes/application");



app.use(cors({
  origin: "*",  // Allows requests from any origin
  credentials: true  // Allows cookies/authorization headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);
app.use("/applications", applicationRoutes);



app.listen(3001, () => {
  console.log("http://localhost:3001");
});

