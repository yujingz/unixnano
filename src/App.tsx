import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import CountDown from './components/CountDown';
import CurrentTime from './components/CurrentTime';
import './styles/App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CurrentTime />} />
        <Route path="/count-down" element={<CountDown />} />
      </Routes>
    </Router>
  );
}
