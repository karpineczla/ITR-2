import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PublicationsAndReports from './pages/PublicationsAndReports'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add rest of the routes here */}
        <Route path="/PublicationsAndReports" element={<PublicationsAndReports />} />

      </Routes>
    </Router>
  )
}
