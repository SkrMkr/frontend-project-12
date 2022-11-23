import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState();

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChannel: channelAdapter.addOne,
    addChannels: channelAdapter.addMany,
  },
});

export const selectors = channelAdapter.getSelectors((state) => state.channels);
export const { actions } = channelSlice;
export default channelSlice.reducer;
