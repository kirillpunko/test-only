import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { timelineSegments } from "../../../consts/timelineConst";
import { TimeSegment } from "../../../types/timeLineType";

interface TimelineState {
  activePeriod: TimeSegment;
}

const initialState: TimelineState = {
  activePeriod: timelineSegments[0] || {
    id: 0,
    startYear: 0,
    endYear: 0,
    label: "",
    events: [],
  },
};

const TimelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setActivePeriod: (state, action: PayloadAction<number>) => {
      state.activePeriod = timelineSegments.find((item) => item.id === action.payload) as TimeSegment;
    },
  },
});

export const { setActivePeriod } = TimelineSlice.actions;
export default TimelineSlice.reducer;
