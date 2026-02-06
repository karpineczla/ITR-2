
import styles from '../styles/Header.module.css'; 
import logo from '../assets/ItrrLogo.png';

const Header = () => {
  const navLinks = [
    //need to change these later o match the page names 
    { name: 'About', href: '/about' },
    { name: 'Publications and Reports', href: '/PublicationsAndReports' },
    { name: 'Interactive Data', href: '/data' },
    { name: 'Employment Opportunities', href: '/employment' },
    { name: 'Resources', href: '/resources' },
    { name: 'Events', href: '/events' },
    { name: 'Survey Kit', href: '/survey-kit' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Subscribe', href: '/subscribe' },
  ];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.topSection}>
        <a href="/">
          <img src={logo} alt="ITRR Logo" className={styles.logoImg} />
        </a>

        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="black">
             <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"></circle>
             <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"></line>
          </svg>
          <input type="text" placeholder="Search" style={{border:'none', outline:'none', marginLeft: '10px'}} />
        </div>
      </div>

      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className={styles.navLink}>{link.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;