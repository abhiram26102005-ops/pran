USE finance_tracker;

INSERT INTO users (id, name, email, password)
VALUES (1, 'Demo User', 'demo@example.com', 'scrypt:32768:8:1$sui6wgDzHbk0M24o$df20a55959ff4d77ef135d116a561b7375b38356a9af2ae289689bca93b3fe5d7354c0c8dff7c60d1e0b72f91f29d655698650a3a2b70872dd6fdb8b274a1ac7')
ON DUPLICATE KEY UPDATE email=email;

INSERT INTO budgets (user_id, monthly_budget, month, year)
VALUES (1, 2500.00, MONTH(CURDATE()), YEAR(CURDATE()))
ON DUPLICATE KEY UPDATE monthly_budget=VALUES(monthly_budget);

INSERT INTO transactions (user_id, title, amount, category, type, notes, transaction_date) VALUES
(1, 'Monthly Salary', 4200.00, 'Salary', 'Income', 'Primary job', CURDATE() - INTERVAL 20 DAY),
(1, 'Groceries', 340.25, 'Food', 'Expense', 'Weekly grocery run', CURDATE() - INTERVAL 18 DAY),
(1, 'Metro card', 65.00, 'Transportation', 'Expense', 'Commute pass', CURDATE() - INTERVAL 15 DAY),
(1, 'Online course', 199.00, 'Education', 'Expense', 'Skill upgrade', CURDATE() - INTERVAL 12 DAY),
(1, 'Family dinner', 120.00, 'Entertainment', 'Expense', 'Weekend outing', CURDATE() - INTERVAL 8 DAY),
(1, 'Medicine', 74.50, 'Healthcare', 'Expense', 'Pharmacy', CURDATE() - INTERVAL 6 DAY),
(1, 'Freelance Payment', 850.00, 'Salary', 'Income', 'Side project', CURDATE() - INTERVAL 4 DAY),
(1, 'New shoes', 150.00, 'Shopping', 'Expense', 'Seasonal purchase', CURDATE() - INTERVAL 2 DAY);

INSERT INTO alerts (user_id, message, alert_type)
VALUES (1, 'Warning! You have used 80% of your budget.', 'warning');
