const Job = require("../models/Job");
const ExpressError = require("../utils/ExpressError");

module.exports = {
  getAllJobs: async (req, res) => {
    const {page=1,limit=10,keyword,minSalary,sort,company,maxSalary}=req.query;
    const pageNo=parseInt(page);
    const limitNo=parseInt(limit);
    const offset=(pageNo-1)*limitNo;
    const jobs = await Job.findAll(offset,limitNo,keyword,minSalary,sort,company,maxSalary);
    res.json({ success: true, jobs });
  },

  getJobById: async (req, res) => {
    const job = await Job.findById(req.params.id);
    if (!job) {
      throw new ExpressError("Job not found", 404);
    }
    console.log(job);
    res.render("job", { job });
  },

  createJob: async (req, res) => {
    const job = await Job.create(
      req.body.title,
      req.body.company,
      req.body.location,
      req.body.salary
    );
    console.log(job);
    res.send("Create a job");
  },

  updateJob: async (req, res) => {
    const job = await Job.update(
      req.params.id,
      req.body.title,
      req.body.company,
      req.body.location,
      req.body.salary
    );
    if (!job) {
      throw new ExpressError("Job not found", 404);
    }
    res.send("Update a job");
  },

  deleteJob: async (req, res) => {
    await Job.deleteById(req.params.id);
    res.send("Delete a job");
  },

  saveJob: async (req, res) => {
    const job = await Job.saveJob(req.params.id, req.user.id);
    res.json({ success: true, job });
  },

  unsaveJob: async (req, res) => {
    const job = await Job.unsaveJob(req.params.id, req.user.id);
    res.json({ success: true, job });
  },

  getSavedJobs: async (req, res) => {
    const jobs = await Job.getSavedJobs(req.user.id);
    res.json({ success: true, jobs });
  },
};
