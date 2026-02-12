import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientRegistration from "./pages/PatientRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
