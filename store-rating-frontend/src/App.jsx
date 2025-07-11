import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StoreList from './components/StoreList';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import MyRatings from './components/MyRatings';

function App() {
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/">Stores</Link> |{" "}
        <Link to="/my-ratings">My Ratings</Link> |{" "}
        {token ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<StoreList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/my-ratings" element={<MyRatings />} />
      </Routes>
    </Router>
  );
}

export default App;
