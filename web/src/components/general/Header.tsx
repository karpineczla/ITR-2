import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { client } from '../../sanityClient';
import '../../styles/Header.css';

interface HeaderAnnouncement {
  text?: string;
  link?: string;
}

interface HeaderNavLink {
  name?: string;
  href?: string;
}

interface HeaderData {
  logoUrl?: string;
  announcements?: HeaderAnnouncement[];
  navLinks?: HeaderNavLink[];
}

const Header = () => {
  const [data, setData] = useState<HeaderData | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const query = `*[_type == "header"][0]{
          "logoUrl": logo.asset->url,
          announcements[]{ text, link },
          navLinks[]{ name, href }
        }`;
        const result = await client.fetch<HeaderData | null>(query);
        setData(result || null);
      } catch {
        setData(null);
      }
    };

    fetchHeader();
  }, []);

  const links = data?.navLinks || [];

  const submitSearch = () => {
    const q = searchValue.trim();
    if (!q) {
      navigate('/search');
      return;
    }
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="headerContainer">
      {/* 1. Announcement Bar (Tan Ticker) */}
      {data?.announcements && (
        <div className="announcementBar">
          <div className="tickerWrapper">
            <div className="tickerText">
  {data?.announcements?.map((item: HeaderAnnouncement, i: number) => (
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
  {data?.announcements?.map((item: HeaderAnnouncement, i: number) => (
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
            {links.map((link) => (
              <li key={`${link.name || 'nav'}-${link.href || ''}`}>
                <Link to={`/${(link.href || '').replace(/^\//, '')}`} className="navLink">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="searchContainer">
          <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="black">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"></line>
          </svg>
          <input
            type="text"
            placeholder="Search"
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
      </div>
    </header>
  );
};

export default Header;