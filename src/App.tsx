import React from "react";
import styles from "./App.module.scss";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TimeLineBlock from "./pages/TimeLineBlock/TimeLineBlock";

function App() {
  return (
    <div className={styles.container}>
      <TimeLineBlock />
    </div>
  );
}

export default App;
