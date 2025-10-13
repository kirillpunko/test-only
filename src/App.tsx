import React from 'react';
import HistoricalDates from "./components/HistoricalDates";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import "./App.scss";

function App() {

  return (
    <div className="container">
      <HistoricalDates/>
    </div>
  );
}

export default App;
