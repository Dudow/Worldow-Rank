import Link from 'next/link';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@material-ui/icons';
import { useState } from 'react';
import styles from './CountriesTable.module.css';

const orderBy = (countries, value, direction) => {
  if (direction === 'asc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }

  if (direction === 'desc') {
    return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }

  return countries;
};

const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }

  if (direction === 'desc') {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const CountriesTable = ({ countries }) => {
  const [direction, setDirection] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const orderedCountries = orderBy(countries, value, direction);

  const switchDirection = () => {
    if (!direction) {
      setDirection('desc');
    } else if (direction === 'desc') {
      setDirection('asc');
    } else {
      setDirection(null);
    }
  };

  const setValueAndDirection = value => {
    switchDirection();
    setValue(value);
  };

  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.heading_flag}></div>

        <button
          className={styles.heading_name}
          onClick={() => setValueAndDirection('name')}
        >
          <div>Name</div>

          {value === 'name' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_population}
          onClick={() => setValueAndDirection('population')}
        >
          <div>Population</div>

          {value === 'population' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_area}
          onClick={() => setValueAndDirection('area')}
        >
          <div>
            Area (km<sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>

          {value === 'area' && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_gini}
          onClick={() => setValueAndDirection('gini')}
        >
          <div>Gini</div>

          {value === 'gini' && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedCountries.map(country => (
        <Link href={`/country/${country.cca3}`} key={country.name.common}>
          <div className={styles.row}>
            <div className={styles.flag}>
              <img src={country.flags.svg} alt={country.name.common} />
            </div>
            <div className={styles.name}>{country.name.common}</div>

            <div className={styles.population}>
              {new Intl.NumberFormat('ja-JP').format(country.population)}
            </div>

            <div className={styles.area}>
              {country.area
                ? new Intl.NumberFormat('ja-JP').format(country.area)
                : 'Unknown'}
            </div>

            <div className={styles.gini}>
              {country.gini
                ? country.gini[Object.keys(country.gini)[0]]
                : 'Unknown'}{' '}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CountriesTable;
