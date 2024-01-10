import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import CountDown from "./components/CountDown";
import CurrentTime from "./components/CurrentTime";

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
