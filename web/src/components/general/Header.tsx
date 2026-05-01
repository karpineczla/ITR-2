import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import '../../styles/Header.css';

const Header = () => {
  const [data, setData] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

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

  const links = data?.navLinks || [];

  const submitSearch = () => {
    const query = searchValue.trim();
    if (!query) {
      navigate('/search');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

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

        <nav className={`navSection ${menuOpen ? 'navSectionOpen' : ''}`}>
          <ul className="navList">
            {links.map((link: any) => (
              <li key={link.name}>
                <Link 
                  to={`/${link.href.replace(/^\//, '')}`} 
                  className="navLink"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search..."
            className="searchInput"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                submitSearch();
              }
            }}
          />
        </div>

        <button 
          className="hamburgerMenu" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Header;