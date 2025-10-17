import React from "react";
import HistoricalDates from "./components/HistoricalDates";
import styles from "./App.module.scss";
import HistoricalDatesProvider from "./components/HistoricalDates/store/historicalDatesProvider";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

function App() {
  return (
    <div className={styles.container}>
      <HistoricalDatesProvider>
        <HistoricalDates />
        <HistoricalDates />
      </HistoricalDatesProvider>
    </div>
  );
}

export default App;
