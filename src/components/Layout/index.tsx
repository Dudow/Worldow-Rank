import Head from 'next/head';
import styles from './Layout.module.css';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import Link from 'next/link';
import { Brightness6Rounded } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Layout = ({ children, title }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      localStorage.getItem('theme'),
    );

    setTheme(localStorage.getItem('theme'));
  }, []);

  const switchTheme = () => {
    if (theme === 'dark') {
      saveTheme('light');
    } else {
      saveTheme('dark');
    }
  };

  const saveTheme = theme => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
      </Head>

      <header className={styles.header}>
        <Link href="/" prefetch>
          <a>
            <Image width={30} height={30} src="/static/logo.png" alt="logo" />
            <h2 className={styles.logo_h2}>Worldow Ranks</h2>
          </a>
        </Link>
      </header>

      <button className={styles.themeSwitcher} onClick={switchTheme}>
        <Brightness6Rounded />
      </button>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <a target="_blank" href={`https://github.com/Dudow`}>
          <p>
            <FavoriteRoundedIcon />
          </p>{' '}
          Dudow{' '}
          <p>
            <FavoriteRoundedIcon />
          </p>
        </a>
      </footer>
    </div>
  );
};

export default Layout;
