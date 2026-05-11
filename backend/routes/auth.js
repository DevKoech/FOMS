const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/User');

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { name, phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ error: 'Missing phone or password' });

    const exists = await User.findOne({ phone });
    if (exists) return res.status(409).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, phone, password_hash: hash, authProvider: 'phone' });

    const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET || 'devsecret');

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) return res.status(400).json({ error: 'Missing phone or password' });

    const user = await User.findOne({ phone });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, phone: user.phone }, process.env.JWT_SECRET || 'devsecret');
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
     scope: ['profile', 'email'], 
     session: false 
    })
  );

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false
  }),
  async (req, res) => {
    try {
      console.log('[OAuth Callback] User authenticated:', req.user ? 'YES' : 'NO');
      console.log('[OAuth Callback] User data:', req.user);
      
      // Generate JWT token for authenticated user
      const token = jwt.sign(
        { 
          id: req.user._id,
          email: req.user.email
        },
        process.env.JWT_SECRET || 'devsecret',
        { expiresIn: '24h' }
      );

      console.log('[OAuth Callback] Token generated:', token ? 'YES' : 'NO');
      const redirectUrl = `${clientUrl}/login?token=${token}`;
      console.log('[OAuth Callback] Redirecting to:', redirectUrl);
      
      // Redirect to frontend with token
      res.redirect(redirectUrl);
    } catch ( err ) {
      console.error('[OAuth Callback] Error:', err);
      res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=auth_failed`);
    }
  }
);

// Logout route
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user (protected)
router.get('/me', (req, res) => {
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;