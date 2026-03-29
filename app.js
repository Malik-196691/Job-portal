const express = require("express");
const app = express();
const jobRoutes = require("./routes/jobs");


app.get("/jobs", jobRoutes);

app.post("/jobs", jobRoutes);

app.put("/jobs/:id", jobRoutes);

app.delete("/jobs/:id", jobRoutes);

app.listen(3000, () => {
    console.log("http://localhost:3000 ");
});