import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../../styles/Header.css';

const Header = () => {
  const [data, setData] = useState<any>(null);

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

  // Use hardcoded links as a fallback if Sanity is empty
  const links = data?.navLinks || [
    { name: 'About1', href: '/about' },
    { name: 'Contact Us1', href: '/contact' }
  ];

  return (
    <header className="headerContainer">
      {/* Announcement Bar */}
      <div className="announcementBar">
        <div className="tickerWrapper">
          <div className="tickerText">
            {/* Map through announcements from Sanity */}
            {data?.announcements?.map((text: string, i: number) => (
              <span key={i}>{text}</span>
            ))}
            {/* Repeat once for seamless loop through CSS animation */}
            {data?.announcements?.map((text: string, i: number) => (
              <span key={`dup-${i}`}>{text}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="topSection">
        <Link to="/">
          {/* Logo from Sanity */}
          <img src={data?.logoUrl || "/logo-placeholder.png"} alt="Itrr-Logo" className="logoImg" />
        </Link>

        <div className="searchContainer">
          <input type="text" placeholder="Search" className="searchInput" />
        </div>
      </div>

      <nav className="navBar">
        <ul className="navList">
          {links.map((link: any) => (
            <li key={link.name}>
              {/* This template literal forces the path to be absolute. it was being a pain and 
              just adding the /"pagename" to the end of the links and breaking everything. */}
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