-- Insert sample data into Users table

INSERT INTO Users (Username, Email, PasswordHash, Role)
VALUES
('LukeMbogo', 'luke@example.com', 'hashed_password_1', 'Admin'),
('JaneDoe', 'jane@example.com', 'hashed_password_2', 'Developer'),
('JohnDev', 'john@example.com', 'hashed_password_3', 'Tester'),
('SarahQA', 'sarah@example.com', 'hashed_password_4', 'QA Engineer');

-- Insert sample data into Projects table

INSERT INTO Projects (ProjectName, Description, CreatedBy, CreatedAt)
VALUES
('E-Farm', 'AI-powered digital farming management system', 1, GETDATE()),
('Autofix', 'Garage and mechanic booking platform', 1, GETDATE()),
('SportsHub', 'Athlete management and event tracking system', 2, GETDATE());

-- Insert sample data into Bugs table

INSERT INTO Bugs (Title, Description, Status, Priority, ProjectID, ReportedBy, AssignedTo)
VALUES
('Login button not responding', 'Users cannot log in after pressing the button', 'Open', 'High', 1, 1, 2),
('Broken image on homepage', 'Hero section image fails to load intermittently', 'In Progress', 'Medium', 1, 3, 2),
('Payment gateway timeout', 'Transaction API returns 504 Gateway Timeout', 'Open', 'Critical', 2, 2, 1),
('Dashboard crash on load', 'Uncaught exception when loading user dashboard', 'Resolved', 'High', 3, 4, 3);

-- Insert sample data into Comments table

INSERT INTO Bugs (Title, Description, Status, Priority, ProjectID, ReportedBy, AssignedTo)
VALUES
('Login button not responding', 'Users cannot log in after pressing the button', 'Open', 'High', 1, 1, 2),
('Broken image on homepage', 'Hero section image fails to load intermittently', 'In Progress', 'Medium', 1, 3, 2),
('Payment gateway timeout', 'Transaction API returns 504 Gateway Timeout', 'Open', 'Critical', 2, 2, 1),
('Dashboard crash on load', 'Uncaught exception when loading user dashboard', 'Resolved', 'High', 3, 4, 3);

SELECT * FROM Users;
SELECT * FROM Projects;
SELECT * FROM Bugs;
SELECT * FROM Comments;
