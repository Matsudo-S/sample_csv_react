
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        {/* ホーム */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
