import { useState } from 'react';
import { GetStaticProps } from 'next';

import { apiV3 } from '../services/api';

import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import SearchInput from '../components/SearchInput';
import CountriesTable from '../components/CountriesTable';

export default function Home({ countries }) {
  const [keyword, setKeyword] = useState('');

  const filteredCountries = countries.filter(
    country =>
      String(country.name.common).toLowerCase().includes(keyword) ||
      String(country.name.official).toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      (country.subregion && country.subregion.toLowerCase().includes(keyword)),
  );

  const onInputChange = event => {
    event.preventDefault();

    setKeyword(event.target.value.toLowerCase());
  };

  return (
    <Layout title="Worldow Rank">
      <div className={styles.inputContainer}>
        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by name, Region or SubRegion"
            onChange={onInputChange}
          />
        </div>
        <div className={styles.counts}>
          Found {filteredCountries.length} countries
        </div>
      </div>
      <CountriesTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const countries = await apiV3.get('all').then(res => res.data);

  return {
    props: {
      countries,
    },
    revalidate: 60 * 60 * 24 * 30,
  };
};
