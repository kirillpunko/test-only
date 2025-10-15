import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { timelineSegments } from "../../../consts/timelineConst";
import { TimeSegment } from "../../../types/timeLineType";

interface TimelineState {
  activePeriod: TimeSegment | undefined;
}

const initialState: TimelineState = {
  activePeriod: undefined,
};

const TimelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setActivePeriod: (state, action: PayloadAction<number>) => {
      state.activePeriod = timelineSegments.find((item) => item.id === action.payload);
    },
  },
});

export const { setActivePeriod } = TimelineSlice.actions;
export default TimelineSlice.reducer;
