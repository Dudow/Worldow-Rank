import Link from "next/link"
import { GetStaticProps } from "next"
import { useEffect, useState } from "react"
import { apiV2 } from "../../services/api"
import InfoRow from "./InfoRow"
import Layout from "../../components/Layout"
import styles from "./Country.module.css"
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded"

const getCountry = async (code) => {
  const country = await apiV2.get(`alpha/${code}`).then((res) => res.data)

  return country
}

const Country = ({ country }) => {
  const [borders, setBorders] = useState([])

  const getBorders = async () => {
    if (!country.borders) {
      return []
    }

    const borders = await Promise.all(
      country.borders.map((border) => getCountry(border))
    )

    setBorders(borders)
  }

  useEffect(() => {
    getBorders()
  }, [])

  return (
    <Layout title={country.name + " - Worldow Rank"}>
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
                  {country.area + " km²" || "Unknown"}
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

            <InfoRow title="Capital" content={country.capital} />
            <InfoRow title="Sub Region" content={country.subregion} />
            <InfoRow
              title="Language"
              content={country.languages.map(({ name }) => name).join(", ")}
            />
            <InfoRow
              title="Currency"
              content={
                country.currencies
                  ? country.currencies
                      .map(({ name, symbol }) => name + " (" + symbol + ")")
                      .join(", ")
                  : "Unknown"
              }
            />
            <InfoRow title="Native name" content={country.nativeName} />
            <InfoRow title="Gini" content={country.gini || "Unknown"} />

            <div className={styles.details_borders}>
              <div className={styles.details_borders_label}>
                Neighboring Countries
              </div>
              <div className={styles.details_borders_container}>
                {borders.length > 0
                  ? borders.map((border) => (
                      <div
                        key={border.name}
                        className={styles.details_borders_country}
                      >
                        <a
                          target="_blank"
                          href={`/country/${border.alpha3Code}`}
                          rel="noreferrer"
                        >
                          <div className={styles.lilflag}>
                            <img src={border.flag} alt={border.name} />
                            <p className={styles.details_borders_name}>
                              {border.name}
                            </p>
                          </div>
                        </a>
                      </div>
                    ))
                  : "None"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Country

export const getStaticPaths = async () => {
  const countries = await apiV2.get("all").then((res) => res.data)

  const paths = countries.map((country) => ({
    params: {
      id: country.alpha3Code,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const country = await getCountry(params.id)

  return {
    props: {
      country,
    },
    revalidate: 60 * 60 * 24 * 30, //30 days
  }
}
