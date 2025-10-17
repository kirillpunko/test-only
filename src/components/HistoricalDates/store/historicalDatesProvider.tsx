import { ReactNode, useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import TimelineReducer from "../lib/TimeLineSlice";

interface HistoricalDatesProviderProps {
  children: ReactNode;
}
const makeStore = () =>
  configureStore({
    reducer: {
      timeline: TimelineReducer,
    },
  });
const HistoricalDatesProvider = ({ children }: HistoricalDatesProviderProps) => {
  const store = useMemo(() => makeStore(), []);
  return <Provider store={store}>{children}</Provider>;
};
export type IRootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export default HistoricalDatesProvider;
