import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../../styles/Header.css';

const Header = () => {
  const [data, setData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls the dropdown

  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";

  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "header"][0]{
      "logoUrl": logo.asset->url,
      announcements,
      navLinks
    }`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.result));
  }, []);

  const links = data?.navLinks || [];

  return (
    <header className="headerContainer">
      {/* Announcement Bar */}
      <div className="announcementBar">
        <div className="tickerWrapper">
          <div className="tickerText">
            {/* 
            Error occurs when used locally: 
            "Uncaught Error: Objects are not valid as a React child 
            (found: object with keys {_key, _type, link, text}). 
            If you meant to render a collection of children, use an array instead." 
            
            Commented out temporarily
            */}
            {/*
            {data?.announcements?.map((text: string, i: number) => (
              <span key={i}>{text}</span>
            ))}
            {data?.announcements?.map((text: string, i: number) => (
              <span key={`dup-${i}`}>{text}</span>
            ))}
            */}
          </div>
        </div>
      </div>

      <div className="topSection">
        <Link to="/">
          <img src={data?.logoUrl || "/logo-placeholder.png"} alt="Itrr Logo" className="logoImg" />
        </Link>

        <div className="topRightActions">
          <div className="searchContainer">
            <input type="text" placeholder="Search" className="searchInput" />
          </div>

          {/* New Menu Dropdown */}
          <div className="menuWrapper">
            <button 
              className="menuToggleButton" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              MENU ☰
            </button>
            
            {isMenuOpen && (
              <ul className="dropdownMenu">
                {links.map((link: any) => (
                  <li key={`menu-${link.name}`}>
                    <Link 
                      to={`/${link.href.replace(/^\//, '')}`} 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav - One Row Only */}
      <nav className="navBar">
        <ul className="navList">
          {links.map((link: any) => (
            <li key={link.name}>
              <Link to={`/${link.href.replace(/^\//, '')}`} className="navLink">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;