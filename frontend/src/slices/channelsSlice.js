import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelAdapter = createEntityAdapter();
const initialState = channelAdapter.getInitialState();

const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addChannel: channelAdapter.addOne,
    addChannels: channelAdapter.addMany,
    removeChannel: channelAdapter.removeOne,
    renameChannel: channelAdapter.updateOne,
  },
});

export const selectors = channelAdapter.getSelectors((state) => state.channels);
export const { actions } = channelSlice;
export default channelSlice.reducer;
