import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/itrr-home'
import PublicationsAndReports from './pages/publications-and-reports'
import Spending from './pages/spending'
import Publications from './pages/publications'
import RecentFindings from './pages/recent-findings'
import News from './pages/news'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add rest of the routes here */}
        <Route path="/publications-and-reports" element={<PublicationsAndReports />} />
        <Route path="/spending" element={<Spending />} />
        <Route path="/news" element={<News />} />
        <Route path="/recent-findings" element={<RecentFindings />} />
        <Route path="/publications" element={<Publications />} />

      </Routes>
    </Router>
  )
}
