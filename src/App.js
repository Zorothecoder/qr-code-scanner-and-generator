import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Scanner from './components/Scanner'
import Login from './components/Login'
import Signup from './components/Signup';

function App() {
  return (
    <div className='container mt-3'>
      <Router>
        <Routes>
          <Route path="/qr-code-scanner-and-generator" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scanner" element={<Scanner />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
