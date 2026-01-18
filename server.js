const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tourism_ai',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const JWT_SECRET = process.env.JWT_SECRET || 'tourism_ai_secret_key_2024';

// Test database connection
app.get('/api/health', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT 1 as result');
        res.json({ 
            status: 'ok', 
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

// 1. USER REGISTRATION
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, suffixName, email, password } = req.body;
        
        // Validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }

        // Check if user exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        // Insert user
        const [result] = await pool.execute(
            `INSERT INTO users (first_name, last_name, suffix_name, email, password_hash) 
             VALUES (?, ?, ?, ?, ?)`,
            [firstName, lastName, suffixName || null, email, passwordHash]
        );
        
        // Return success message (no auto-login)
        res.status(201).json({
            success: true,
            message: 'Registration successful. Please log in.',
            user: {
                id: result.insertId,
                firstName,
                lastName,
                email
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 2. USER LOGIN
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // Find user
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const user = users[0];
        
        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 3. FORGOT PASSWORD - EMAIL
app.post('/api/forgot-password/email', async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }
        
        // Check if user exists
        const [users] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }
        
        // Generate reset token
        const resetToken = Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
        
        // Set expiration (1 hour from now)
        const expiresAt = new Date(Date.now() + 3600000);
        
        // Store token in database
        await pool.execute(
            `INSERT INTO password_reset_tokens (email, token, expires_at) 
             VALUES (?, ?, ?)`,
            [email, resetToken, expiresAt]
        );
        
        res.json({
            success: true,
            message: 'Password reset instructions sent to email',
            token: resetToken
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 4. FORGOT PASSWORD - MOBILE
app.post('/api/forgot-password/mobile', async (req, res) => {
    try {
        const { mobileNumber } = req.body;
        
        if (!mobileNumber) {
            return res.status(400).json({ error: 'Mobile number is required' });
        }
        
        // Check if user exists
        const [users] = await pool.execute(
            'SELECT id, email FROM users WHERE mobile_number = ?',
            [mobileNumber]
        );
        
        if (users.length === 0) {
            return res.status(404).json({ error: 'Mobile number not found' });
        }
        
        const user = users[0];
        
        // Generate reset token
        const resetToken = Math.random().toString(36).substring(2, 15) + 
                          Math.random().toString(36).substring(2, 15);
        
        // Set expiration (1 hour from now)
        const expiresAt = new Date(Date.now() + 3600000);
        
        // Store token in database
        await pool.execute(
            `INSERT INTO password_reset_tokens (email, token, expires_at) 
             VALUES (?, ?, ?)`,
            [user.email, resetToken, expiresAt]
        );
        
        res.json({
            success: true,
            message: 'Password reset instructions sent',
            token: resetToken
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 5. RESET PASSWORD
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.status(400).json({ error: 'Token and new password are required' });
        }
        
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters' });
        }
        
        // Verify token
        const [tokens] = await pool.execute(
            `SELECT * FROM password_reset_tokens 
             WHERE token = ? AND used = FALSE AND expires_at > NOW()`,
            [token]
        );
        
        if (tokens.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }
        
        const resetToken = tokens[0];
        
        // Hash new password
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);
        
        // Update user password
        await pool.execute(
            'UPDATE users SET password_hash = ? WHERE email = ?',
            [newPasswordHash, resetToken.email]
        );
        
        // Mark token as used
        await pool.execute(
            'UPDATE password_reset_tokens SET used = TRUE WHERE id = ?',
            [resetToken.id]
        );
        
        res.json({ 
            success: true,
            message: 'Password reset successful. You can now login with your new password.' 
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 6. VERIFY TOKEN
app.get('/api/verify-token', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ valid: false, error: 'No token provided' });
        }
        
        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ valid: false, error: 'Invalid token' });
            }
            
            // Get user data
            const [users] = await pool.execute(
                'SELECT id, first_name, last_name, email FROM users WHERE id = ?',
                [decoded.userId]
            );
            
            if (users.length === 0) {
                return res.status(404).json({ valid: false, error: 'User not found' });
            }
            
            res.json({
                valid: true,
                user: {
                    id: users[0].id,
                    firstName: users[0].first_name,
                    lastName: users[0].last_name,
                    email: users[0].email
                }
            });
        });
    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({ valid: false, error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});