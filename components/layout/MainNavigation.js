import Link from 'next/link';
import styles from './MainNavigation.module.css';



function Home() {
  return (
    <ul className={styles.navList}>
      <li className={styles.navItem}>
        <Link href="/">
          <span className={styles.navLink}>Home</span>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/about">
          <span className={styles.navLink}>About Us</span>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link href="/blog/hello-world">
          <span className={styles.navLink}>Blog Post</span>
        </Link>
      </li>
    </ul>
  );
}

export default Home;