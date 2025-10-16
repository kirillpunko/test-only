import { ReactNode } from "react";
import TimelineReducer from "../lib/TimeLineSlice";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

const store = configureStore({
  reducer: {
    timeline: TimelineReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

interface HistoricalDatesProviderProps {
  children: ReactNode;
}

const HistoricalDatesProvider = ({ children }: HistoricalDatesProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default HistoricalDatesProvider;
