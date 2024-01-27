const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const PORT = 5010;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_database_url' with your actual MongoDB URL)
mongoose.connect('mongodb+srv://viveksnh933:viveksnh933@cluster0.mx18j8r.mongodb.net/form', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  dob: String,
  sex: String,
  mobile: Number,
  govtIdType: String,
  govtId: String,
  address1:String,
  address2:String,
city:String,
state:String,
country:String,
pincode:String


});

// Create User model
const User = mongoose.model('User', userSchema);

// Step-1 API route
app.post('/api/register-step1', async (req, res) => {
    const userData = req.body;
  
    try {
      // Perform Step-1 Yup validation here...
      // Validate userData for Step-1 fields
      // For simplicity, let's assume Step-1 fields are valid
  
      // Save Step-1 data to MongoDB
      const newUserStep1 = new User(userData);
      await newUserStep1.save();
  
      const successMessage = 'Step-1 data registered successfully';
      res.json({ success: true, message: successMessage });
    } catch (error) {
      console.error('Step-1 Registration Error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
  app.post('/api/register-step2', async (req, res) => {
    const userData = req.body;
  
    try {
      // Perform Step-2 Yup validation here...
      // Validate userData for Step-2 fields
      // For simplicity, let's assume Step-2 fields are valid
  
      // Find the existing user by some identifier (e.g., email) and update the document
      const existingUser = await User.findOneAndUpdate(
        { name: userData.name}, // Replace 'email' with the actual unique identifier
        { $set: { ...userData } }, // Update the existing user data with new data
        { new: true, upsert: true } // Create a new document if not found
      );
  
      const successMessage = 'Step-2 data registered successfully';
      res.json({ success: true, message: successMessage });
    } catch (error) {
      console.error('Step-2 Registration Error:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });


  // GET request to fetch all users
  app.get('/api/users', async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
  
      // Respond with the fetched users
      res.json({ success: true, users });
    } catch (error) {
      console.error('Error fetching users:', error.message);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  
// ... (Additional routes as needed)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
