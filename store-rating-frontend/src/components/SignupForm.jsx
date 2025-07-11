import React, { useState } from 'react';
import axios from 'axios';

function SignupForm({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      setMessage('Signup successful!');
      onSignup?.(token);
    } catch (err) {
      console.error(err);
      setMessage('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
      <p>{message}</p>
    </form>
  );
}

export default SignupForm;
