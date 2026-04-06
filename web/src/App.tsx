import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/itrr-home'
import About from './pages/about'
import PublicationsAndReports from './pages/publications-and-reports'
import Events from './pages/events'
import InteractiveData from './pages/interactive-data'
import InteractiveDashboard from './pages/interactive-dashboard'
import Help from './pages/help'
import Resources from './pages/resources'
import Subscribe from './pages/subscribe'
import EmploymentOpportunities from './pages/employment-opportunities'
import SurveyKit from './pages/survey-kit'
import PilotCommunity from './pages/pilot-community'
import Sessions from './pages/sessions'
import EducationAndWorkshops from './pages/education-and-workshops'
import ContinuingTheConversation from './pages/continuing-the-conversation'
import GetInvolved from './pages/get-involved-and-resources'
import Search from './pages/search'
import Contact from './pages/contact'
import GlobalLoadingOverlay from './components/general/GlobalLoadingOverlay'


export default function App() {
  return (
    <Router>
      <GlobalLoadingOverlay />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/publications-and-reports" element={<PublicationsAndReports />} />
        <Route path="/events" element={<Events />} />
        <Route path="/interactive-data" element={<InteractiveData />} />
        <Route path="/interactive-dashboard" element={<InteractiveDashboard />} />
        <Route path="/help" element={<Help />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/employment-opportunities" element={<EmploymentOpportunities />} />
        <Route path="/survey-kit" element={<SurveyKit />} />
        <Route path="/pilot-community" element={<PilotCommunity />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/education-and-workshops" element={<EducationAndWorkshops />} />
        <Route path="/continuing-the-conversation" element={<ContinuingTheConversation />} />
        <Route path="/get-involved-and-resources" element={<GetInvolved />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  )
}
