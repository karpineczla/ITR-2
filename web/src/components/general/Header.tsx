import '../../styles/Header.css';
import logo from '../../assets/ItrrLogo.png';
import { Link } from 'react-router-dom';

const Header = () => {
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

  return (
    <header className="headerContainer">
      {/*  announcemnets */}
      <div className="announcementBar">
      <div className="tickerWrapper">
        <div className="tickerText">
          <span>✨ New Publication: 2024 Tourism Economic Impact Report is now available!</span>
          <span>🚀 Check out our new Interactive Data dashboard!</span>
          <span>👋 Welcome to the ITRR Portal.</span>
      {/* duplicate the text so its seamless loop  */}
          <span>✨ New Publication: 2024 Tourism Economic Impact Report is now available!</span>
          <span>🚀 Check out our new Interactive Data dashboard!</span>
          <span>👋 Welcome to the ITRR Portal.</span>
        </div>
      </div>
    </div>
      <div className="topSection">
        <Link to="/">
          <img src={logo} alt="ITRR Logo" className="logoImg" />
        </Link>

        <div className="searchContainer">
          <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="black">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"></line>
          </svg>
          <input type="text" placeholder="Search" style={{ border: 'none', outline: 'none', marginLeft: '10px' }} />
        </div>
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