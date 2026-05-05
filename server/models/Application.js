const pool = require("../db");

class Application {
  static async apply(userId, jobId, resumeUrl, coverLetter) {
    const result = await pool.query(
      "INSERT INTO applications (job_id, user_id, resume_url, cover_letter) VALUES ($1, $2, $3, $4) RETURNING *",
      [jobId, userId, resumeUrl, coverLetter],
    );
    console.log(result.rows[0]);
    return result.rows[0];
  }

  static async getAllapplications() {
    let query =
      "SELECT applications.*, users.username as user_name, jobs.title as job_title FROM applications JOIN users ON applications.user_id = users.id JOIN jobs ON applications.job_id = jobs.id";
    const result = await pool.query(query);
    return result.rows;
  }

  static async getMyapplications(userId) {
    const result = await pool.query(
      "SELECT applications.*, users.username as user_name, jobs.title as job_title FROM applications JOIN users ON applications.user_id = users.id JOIN jobs ON applications.job_id = jobs.id WHERE applications.user_id = $1 ORDER BY applications.id DESC",
      [userId],
    );
    return result.rows;
  }

  static async updateStatus(id, status) {
    const result = await pool.query(
      "UPDATE applications SET status = $1 WHERE id = $2 RETURNING *",
      [status, id],
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const result = await pool.query(
      "DELETE FROM applications WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rows[0];
  }
}

module.exports = Application;
