import React from "react";
import HistoricalDates from "../../components/HistoricalDates";
import HistoricalDatesProvider from "../../components/HistoricalDates/store/historicalDatesProvider";

const TimeLineBlock = () => {
  return (
    <HistoricalDatesProvider>
      <HistoricalDates />
    </HistoricalDatesProvider>
  );
};

export default TimeLineBlock;
