
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        
        {/* left side addresses */}
        <div className={styles.addressSection}>
          <p>Institute for Tourism &</p>
          <p>Recreation Research</p>
          <p style={{ marginTop: '10px' }}>32 Campus Drive</p>
          <p>Missoula, MT 59812</p>
        </div>

        {/* Links */}
        <div className={styles.linksSection}>
          <a href="/contact" className={styles.footerLink}>Contact Us</a>
          <div className={styles.divider}></div>
          <a href="/about" className={styles.footerLink}>About</a>
        </div>

        {/*  Social Media */}
        <div className={styles.socialSection}>
          <a href="https://www.youtube.com/@itrrumt" aria-label="YouTube">
            <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.3 3.5 12 3.5 12 3.5s-7.3 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.2 0 12 0 12s0 3.8.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 2 1 9.3 1 9.3 1s7.3 0 9.3-1c1.1-.3 1.9-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/></svg>
          </a>
          <a href="https://www.instagram.com/itrrumt/" aria-label="Instagram">
            <svg className={styles.socialIcon} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.linkedin.com/company/itrrumt" aria-label="LinkedIn">
            <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://www.facebook.com/itrrumt/" aria-label="Facebook">
            <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.14h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;