import '../../styles/Header.css';
import logo from '../../assets/ItrrLogo.png';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const navLinks = [
    //need to change these later o match the page names 
    { name: 'About', href: '/about' },
    { name: 'Publications and Reports', href: '/publications-and-reports' },
    { name: 'Interactive Data', href: '/interactive-data' },
    { name: 'Employment Opportunities', href: '/employment-opportunities' },
    { name: 'Resources', href: '/resources' },
    { name: 'Events', href: '/events' },
    { name: 'Survey Kit', href: '/survey-kit' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Subscribe', href: '/subscribe' },
  ]

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = searchTerm.trim()
    if (!trimmed) {
      return
    }

    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <header className="headerContainer">
      <div className="topSection">
        <Link to="/">
          <img src={logo} alt="ITRR Logo" className="logoImg" />
        </Link>

        <form className="searchContainer" onSubmit={handleSearchSubmit} role="search">
          <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="black">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"></line>
          </svg>
          <input
            className="searchInput"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Search site content"
          />
        </form>
      </div>

      <nav className="navBar">
        <ul className="navList">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.href} className="navLink">{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header