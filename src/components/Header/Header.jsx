import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo}>
        <a href="/" className={styles.navLink}>CSV Viewer</a>
          </h1>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>Home</a></li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 