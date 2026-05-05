const Application = require("../models/Application");

module.exports = {
  apply: async (req, res) => {
    try {
      const userId = req.user.id;
      const jobId = req.body.jobId || req.body.job_id;
      const resumeUrl = req.body.resumeUrl || req.body.resume_url;
      const coverLetter = req.body.coverLetter || req.body.cover_letter;

      const application = await Application.apply(
        userId,
        jobId,
        resumeUrl,
        coverLetter,
      );
      res.json({ success: true, application });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getAllapplications: async (req, res) => {
    try {
      const applications = await Application.getAllapplications();
      res.json({ success: true, applications });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getMyapplications: async (req, res) => {
    try {
      const { userId } = req.params;
      const applications = await Application.getMyapplications(userId);
      res.json(applications);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const { id } = req.params;
      const application = await Application.updateStatus(id, status);
      res.json(application);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteById: async (req, res) => {
    try {
      const { id } = req.params;
      const application = await Application.deleteById(id);
      res.json(application);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
