import { useEffect, useState } from 'react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Header.css';

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
          <svg className="searchIcon" viewBox="0 0 24 24" fill="none" stroke="black">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"></line>
          </svg>
          <input type="text" placeholder="Search" style={{ border: 'none', outline: 'none', marginLeft: '10px' }} />
        </div>
      </div>
    </header>
  );
};

export default Header;