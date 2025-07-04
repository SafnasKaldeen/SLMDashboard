# Report App

This is the Dashboard and Reporting application for the **SL-Mobility** organization.

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.16.0)
- npm (v9.5.0)
- [Next.js](https://nextjs.org/) (v13.4.4)
- A Snowflake account for database access

---

### 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/SLMobility/report-app.git
   cd report-app
   ```

2. **Install root dependencies** (outside the `client` folder):

   ```bash
   npm install
   ```

3. **Navigate into the `client` directory:**

   ```bash
   cd client
   ```

4. **Install client-side dependencies:**

   ```bash
   npm install
   ```

5. **Set up environment variables**  
   Create a `.env` file inside the `client` folder and add the following:

   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   Snowflake_Account_Name=<your_snowflake_account_name>
   Snowflake_User_Name=<your_snowflake_user_name>
   Snowflake_Password=<your_snowflake_password>
   Snowflake_Database=<your_snowflake_database>
   Snowflake_Schema=<your_snowflake_schema>
   Snowflake_Warehouse=<your_snowflake_warehouse>
   Snowflake_Role=<your_snowflake_role>
   ```

6. **Run the application in development mode:**

   ```bash
   npm run dev
   ```

---

## 🧠 Notes

- Make sure your Snowflake credentials are valid.
- If you're facing large file issues when pushing to GitHub, refer to [Git LFS](https://git-lfs.github.com) or clean history using BFG.

---

## 📁 Project Structure

```
report-app/
│
├── client/           # Frontend (Next.js)
├── Api/              # Backend API logic
├── model/            # ML models and scripts
└── README.md
├── .env              # Environment variables
└── package.json      # Project dependencies and scripts
└── certs/            # SSL certificates
└── .gitignore        # Git ignore rule

```

---

## 📬 Contact

For questions, contact the [Safnas Kaldeen](mailto:safnas@slmobility.com).
