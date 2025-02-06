import { Route, BrowserRouter as Router, Routes } from 'react-router';

import CountDown from './pages/CountDown';
import CurrentTime from './pages/CurrentTime';
import { Pace } from './pages/Pace';
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
          <Route path="/pace" element={<Pace />} />
        </Routes>
      </Router>
    </div>
  );
}
