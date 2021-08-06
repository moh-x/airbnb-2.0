import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
import { MoonIcon } from "@heroicons/react/solid";
import { SunIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export default function Home({ exploreData, cardsData }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(JSON.parse(window.localStorage.getItem("darkMode")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <html
      className={`${
        darkMode && "dark bg-gray-900"
      } transition duration-1000 ease-out`}
    >
      <Head>
        <title>Airbnb 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16 dark:bg-gray-900 dark:text-gray-200">
        <section className="pt-6 dark:bg-gray-900">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull data from a server -API */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, location, distance }) => (
              <SmallCard
                key={img}
                img={img}
                location={location}
                distance={distance}
              />
            ))}
          </div>
        </section>

        <section className="dark:bg-gray-900">
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardsData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists created by Airbnb"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed bottom-6 right-6 p-1 z-40 bg:gray-800 dark:bg-gray-400 rounded-full shadow-md dark:shadow-inner hover:shadow-xl active:scale-105 transform transition ease-out outline-none"
      >
        {darkMode ? (
          <SunIcon className="w-8 h-8 z-50 rounded-full" />
        ) : (
          <MoonIcon className="w-8 h-8 z-50 rounded-full" />
        )}
      </button>
    </html>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => res.json()
  );

  const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
    res.json()
  );

  return {
    props: {
      exploreData,
      cardsData,
    },
  };
}
