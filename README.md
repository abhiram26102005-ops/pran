# Personal Finance Tracker with Budget Alerts

A modern Flask, MySQL, Bootstrap 5, and Chart.js web app for tracking income, expenses, monthly budgets, budget alerts, reports, exports, and profile management.

## Features

- Landing page with hero, benefits, features, and CTA buttons
- Register/login with hashed passwords, JWT-backed sessions, validation, and CSRF tokens
- Finance dashboard with income, expenses, balance, budget cards, charts, recent transactions, and notification center
- Add/search/filter transactions by category and type
- Monthly budget create, edit, delete, and color-coded progress alerts
- Automatic alerts at 80%, 100%, and exceeded budget thresholds
- Daily, weekly, monthly, and yearly report filters
- PDF and Excel-compatible CSV exports
- Profile editing with password update and profile photo upload
- Responsive mobile-first glassmorphism UI with sidebar navigation and dark/light mode
- Parameterized SQL queries for SQL injection protection

## Project Structure

```text
app.py
requirements.txt
.env.example
app/
  templates/
  static/
    css/styles.css
    js/app.js
database/
  schema.sql
  sample_data.sql
```

## Installation

1. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create your environment file:

```bash
copy .env.example .env
```

4. Update `.env` with your MySQL credentials.

5. Create the database and sample data:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p finance_tracker < database/sample_data.sql
```

If MySQL is not installed or the service is stopped, the app automatically uses a local SQLite development database in your Windows temp folder. To require MySQL only, set `SQLITE_FALLBACK=false` in `.env`.

6. Run the app:

```bash
flask run
```

Open `http://127.0.0.1:5000`.

## Demo Login

The sample data creates:

- Email: `demo@example.com`
- Password: `password123`

## Google Login Setup

1. In Google Cloud Console, create an OAuth 2.0 Client ID for a web application.
2. Add this authorized redirect URI:

```text
http://127.0.0.1:5000/auth/google/callback
```

If you run Flask on another port, use that port in the redirect URI.

3. Add the credentials to `.env`:

```text
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

4. Restart Flask. The Google login button will become active.

## REST/API Endpoints

- `GET /api/dashboard` returns chart data for dashboard category and monthly expense charts.
- `GET /api/reports?period=daily|weekly|monthly|yearly` returns spending trends and category analytics.
- `GET /export/pdf` downloads a PDF report.
- `GET /export/excel` downloads an Excel-compatible CSV report.

## Main Routes

- `/` landing page
- `/register` user registration
- `/login` user login
- `/dashboard` financial overview
- `/transactions` add, search, and filter transactions
- `/budget` budget management
- `/reports` reports and analytics
- `/profile` profile management
- `/logout` logout

## Cloud Ready Notes

The app uses environment variables for secrets and database settings, keeps uploads inside `app/static/uploads`, and uses parameterized SQL. For production, set strong `SECRET_KEY` and `JWT_SECRET`, serve behind HTTPS, configure a managed MySQL database, and use object storage for uploaded profile photos.
