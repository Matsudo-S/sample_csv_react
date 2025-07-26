import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Blog App</h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>Home</a></li>
            <li><a href="/about" className={styles.navLink}>About</a></li>
            <li><a href="/contact" className={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 