import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/itrr-home'
import About from './pages/about'
import PublicationsAndReports from './pages/publications-and-reports'
import Spending from './pages/spending'
import Publications from './pages/publications'
import RecentFindings from './pages/recent-findings'
import News from './pages/news'
import Events from './pages/events'
import InteractiveData from './pages/interactive-data'
import Resources from './pages/resources'
import Subscribe from './pages/subscribe'
import Contact from './pages/contact'
import EmploymentOpportunities from './pages/employment-opportunities'
import SurveyKit from './pages/survey-kit'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications-and-reports" element={<PublicationsAndReports />} />
        <Route path="/spending" element={<Spending />} />
        <Route path="/news" element={<News />} />
        <Route path="/recent-findings" element={<RecentFindings />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/events" element={<Events />} />
        <Route path="/interactive-data" element={<InteractiveData />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/employment-opportunities" element={<EmploymentOpportunities />} />
        <Route path="/survey-kit" element={<SurveyKit />} />
      </Routes>
    </Router>
  )
}
