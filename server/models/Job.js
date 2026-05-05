const pool = require("../db");

class Job {
  static async findAll(
    offset,
    limitNo,
    keyword,
    minSalary,
    sort,
    company,
    maxSalary,
  ) {
    let query = "SELECT * FROM jobs where 1=1";
    let values = [];
    if (keyword) {
      values.push("%" + keyword + "%");
      query += ` and (location ILIKE $${values.length} or title ILIKE $${values.length})`;

    }
    if (minSalary) {
      values.push(minSalary);
      query += ` AND salary >= $${values.length}`;
    }
    if (company) {
      values.push("%" + company + "%");
      query += ` AND company LIKE $${values.length}`;
    }
    if (maxSalary) {
      values.push(maxSalary);
      query += ` AND salary <= $${values.length}`;
    }
    if (sort === "salary_asc") {
      query += " ORDER BY salary ASC";
    } else if (sort === "salary_desc") {
      query += " ORDER BY salary DESC";
    } else {
      query += " ORDER BY id DESC"; // default
    }
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limitNo, offset);
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async findById(id) {
    const result = await pool.query("SELECT * FROM jobs WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async create(title, company, location, salary) {
    const result = await pool.query(
      "INSERT INTO jobs (title, company, location, salary) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, company, location, salary],
    );
    return result.rows[0];
  }

  static async update(id, title, company, location, salary) {
    const result = await pool.query(
      "UPDATE jobs SET title = $1, company = $2, location = $3, salary = $4 WHERE id = $5 RETURNING *",
      [title, company, location, salary, id],
    );
    return result.rows[0];
  }

  static async deleteById(id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      await client.query("DELETE FROM applications WHERE job_id = $1", [id]);
      await client.query("DELETE FROM saved_jobs WHERE job_id = $1", [id]);
      await client.query("DELETE FROM jobs WHERE id = $1", [id]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async saveJob(id, userId) {
    const result = await pool.query(
      "INSERT INTO saved_jobs (job_id, user_id) VALUES ($1, $2) RETURNING *",
      [id, userId],
    );
    return result.rows[0];
  }

  static async unsaveJob(id, userId) {
    const result = await pool.query(
      "DELETE FROM saved_jobs WHERE job_id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );
    return result.rows[0];
  }

  static async getSavedJobs(userId) {
    const result = await pool.query(
      "SELECT jobs.* FROM saved_jobs JOIN jobs ON saved_jobs.job_id = jobs.id WHERE saved_jobs.user_id = $1",
      [userId],
    );
    return result.rows;
  }

}

module.exports = Job;
