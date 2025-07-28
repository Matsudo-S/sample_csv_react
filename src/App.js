
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* ホーム */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
