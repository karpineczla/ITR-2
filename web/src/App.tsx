import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PublicationsAndReports from './pages/PublicationsAndReports'
import Spending from './pages/Spending'
import Publications from './pages/Publications'
import RecentFindings from './pages/RecentFindings'
import News from './pages/News'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add rest of the routes here */}
        <Route path="/PublicationsAndReports" element={<PublicationsAndReports />} />
        <Route path="/Spending" element={<Spending />} />
        <Route path="/News" element={<News />} />
        <Route path="/RecentFindings" element={<RecentFindings />} />
        <Route path="/Publications" element={<Publications />} />

      </Routes>
    </Router>
  )
}
