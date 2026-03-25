import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header = () => {
  const [data, setData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const PROJECT_ID = "a9qy1267"; 
  const DATASET = "production";

  useEffect(() => {
    const query = encodeURIComponent(`*[_type == "header"][0]{
      "logoUrl": logo.asset->url,
      announcements[]{ text, link },
      navLinks
    }`);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${query}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.result));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1200) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = data?.navLinks || [];

  return (
    <header className="headerContainer">
      {/* 1. Announcement Bar (Tan Ticker) */}
      {data?.announcements && (
        <div className="announcementBar">
          <div className="tickerWrapper">
            <div className="tickerText">
  {data?.announcements?.map((item: any, i: number) => (
    <span key={i}>
      {item.link ? (
        <a href={item.link} className="tickerLink">
          {item.text}
        </a>
      ) : (
        item.text
      )}
    </span>
  ))}
  {/* Duplicate for seamless loop */}
  {data?.announcements?.map((item: any, i: number) => (
    <span key={`dup-${i}`}>
      {item.link ? (
        <a href={item.link} className="tickerLink">
          {item.text}
        </a>
      ) : (
        item.text
      )}
    </span>
  ))}
</div>
          </div>
        </div>
      )}

      {/* 2. Single-Row Main Header (Grey Background) */}
      <div className="mainHeader">
        <Link to="/" className="logoLink">
          <img src={data?.logoUrl || "/logo-placeholder.png"} alt="ITRR Logo" className="logoImg" />
        </Link>

        <nav className="navSection">
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

        <div className="searchContainer">
          <input type="text" placeholder="Search..." className="searchInput" />
        </div>

        <button
          type="button"
          className="menuButton"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menuButtonBar" />
          <span className="menuButtonBar" />
          <span className="menuButtonBar" />
        </button>
      </div>

      <nav className={`mobileNav ${isMenuOpen ? 'isOpen' : ''}`} aria-hidden={!isMenuOpen}>
        <ul className="mobileNavList">
          {links.map((link: any) => (
            <li key={`mobile-${link.name}`}>
              <Link
                to={`/${link.href.replace(/^\//, '')}`}
                className="mobileNavLink"
                onClick={() => setIsMenuOpen(false)}
              >
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