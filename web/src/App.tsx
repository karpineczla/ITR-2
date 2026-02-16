import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Home from './pages/Home'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add routes here */}

      </Routes>
    </Router>
  )
}
