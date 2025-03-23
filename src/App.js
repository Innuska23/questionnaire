import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Catalog from "./pages/Catalog/Catalog";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import TakeQuiz from "./pages/TakeQuiz/TakeQuiz";
import EditQuiz from "./pages/EditQuiz/EditQuiz";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/take/:id" element={<TakeQuiz />} />
        <Route path="/edit/:id" element={<EditQuiz />} />
        <Route path="/results/:id" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
