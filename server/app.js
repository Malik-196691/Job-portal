const express = require("express");
const app = express();
const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/users");
const applicationRoutes = require("./routes/application");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/jobs", jobRoutes);
app.use("/users", userRoutes);
app.use("/applications", applicationRoutes);


app.listen(3001, () => {
  console.log("http://localhost:3001");
});

