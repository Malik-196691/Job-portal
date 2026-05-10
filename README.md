# Job Portal

A full-stack, modern job portal application designed to seamlessly connect job seekers with employers. Built with Next.js for a dynamic frontend and Express.js with PostgreSQL for a robust backend, this platform offers a comprehensive set of features for both candidates and administrators.

## 🚀 Features

### For Job Seekers
- **User Authentication:** Secure login and registration system.
- **Browse Jobs:** Explore available job listings with advanced filters and search functionality.
- **Job Details:** View comprehensive information about job openings.
- **Apply for Jobs:** Easy and straightforward application process.
- **Manage Applications:** Track the status of submitted applications.
- **Saved Jobs:** Bookmark jobs to review or apply for them later.

### For Administrators
- **Admin Dashboard:** Centralized hub for platform analytics and management.
- **Create Jobs:** Post new job opportunities.
- **Manage Applications:** Review candidate applications and update their status.
- **Analytics:** View total jobs, total applications, and status-based statistics.

## 🛠️ Technology Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** Framer Motion
- **HTTP Client:** Axios

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Bcrypt (Password Hashing), CORS

## 📦 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v18 or higher)
- PostgreSQL

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Job-portal
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory and configure your environment variables (e.g., Database connection string, JWT Secret, Port).
   - Start the backend server:
     ```bash
     npm start
     # Server will run on http://localhost:3001
     ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   ```
   - Create a `.env.local` file in the `client` directory and configure your API endpoints.
   - Start the development server:
     ```bash
     npm run dev
     # Client will run on http://localhost:3000
     ```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
