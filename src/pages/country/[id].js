import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import styles from "./Country.module.css";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";

const getCountry = async (id) => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await res.json();

  return country;
};

const Country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );

    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name} />
            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>
            <div className={styles.overview_number}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {new Intl.NumberFormat("ja-JP").format(country.population)}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {country.area || "Unknown"}
                </div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <div className={styles.back}>
              <Link href={`/`}>
                <span className={styles.back_label}>
                  <ArrowBackRoundedIcon /> Back
                </span>
              </Link>
            </div>
            <h4 className={styles.details_panel_heading}>Details</h4>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Sub Region</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currency</div>
              <div className={styles.details_panel_value}>
                {country.currencies
                  .map(({ name, symbol }) => name + " (" + symbol + ")")
                  .join(", ")}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>
                {country.gini || "Unknown"}
              </div>
            </div>

            <div className={styles.details_borders}>
              <div className={styles.details_borders_label}>
                Neighbouring Countries
              </div>
              <div className={styles.details_borders_container}>
                {borders.map(({ flag, name, alpha3Code }) => (
                  <div key={name} className={styles.details_borders_country}>
                    <a target="_blank" href={`/country/${alpha3Code}`}>
                      <div className={styles.lilflag}>
                        <img src={flag} alt="name" />
                        <p className={styles.details_borders_name}>{name}</p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch(`https://restcountries.eu/rest/v2/all`);
  const countries = await res.json();

  const paths = countries.map((country) => ({
    params: {
      id: country.alpha3Code,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
