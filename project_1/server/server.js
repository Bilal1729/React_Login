const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://Bilal_1729:r5onKrfJFaUC82AH@cluster0.8h8xrs2.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 20 },
  dob: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Endpoint to register a new user
app.post('/api/register', async (req, res) => {
  const { name, dob, gender, phone, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, dob, gender, phone, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(400).send('Error registering user: ' + err.message);
  }
});

// Endpoint to handle user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).send('Login success');
    } else {
      res.status(400).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// Endpoint to reset user password
app.post('/api/reset-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send('Old password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send('Password reset successful');
  } catch (err) {
    console.error('Error resetting password:', err.message);
    res.status(500).send('Server error: ' + err.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
