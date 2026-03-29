const pool = require("../db");
const ExpressError = require("../utils/expressError");

module.exports = {
  getAllJobs: (req, res) => {
    const result = pool.query("SELECT * FROM jobs");
    if (!result.rows[0]) {
      throw new ExpressError("No jobs found", 200);
    }
    const jobs = result.rows;
    console.log(jobs);
    res.render("jobs", { jobs });
  },

  getJobById: (req, res) => {
    const result = pool.query("SELECT * FROM jobs WHERE id = $1", [
      req.params.id,
    ]);
    if (!result.rows[0]) {
      throw new ExpressError("Job not found", 404);
    }
    const job = result.rows[0];
    console.log(job);
    res.render("job", { job });
  },

  createJob: (req, res) => {
    const result = pool.query(
      "INSERT INTO jobs (title, company, location, salary) VALUES ($1, $2, $3, $4)",
      [req.body.title, req.body.company, req.body.location, req.body.salary],
    );
    console.log(result);
    res.send("Create a job");
  },

  updateJob: (req, res) => {
    const result = pool.query(
      "UPDATE jobs SET title = $1, company = $2, location = $3, salary = $4 WHERE id = $5",
      [
        req.body.title,
        req.body.company,
        req.body.location,
        req.body.salary,
        req.params.id,
      ],
    );
    if (!result.rows[0]) {
      throw new ExpressError("Job not found", 404);
    }
    res.send("Update a job");
  },

  deleteJob: (req, res) => {
    const result = pool.query("DELETE FROM jobs WHERE id = $1", [
      req.params.id,
    ]);
    if (!result.rows[0]) {
      throw new ExpressError("Job not found", 404);
    }
    res.send("Delete a job");
  },
};
