const registerUser = (req, res) => {
  // Dummy example, replace with DB logic
  res.status(201).json({ message: 'User registered' });
};

const loginUser = (req, res) => {
  // Dummy example, replace with auth logic
  res.status(200).json({ token: 'sample-jwt-token' });
};

module.exports = { registerUser, loginUser };
