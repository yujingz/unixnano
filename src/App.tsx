import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CountDown from './pages/CountDown';
import CurrentTime from './pages/CurrentTime';
import { TopBar } from './pages/TopBar';
import './styles/index.css';

export default function App() {
  return (
    <div className="app-container">
      <TopBar />
      <Router>
        <Routes>
          <Route path="/" element={<CurrentTime />} />
          <Route path="/count-down" element={<CountDown />} />
        </Routes>
      </Router>
    </div>
  );
}
