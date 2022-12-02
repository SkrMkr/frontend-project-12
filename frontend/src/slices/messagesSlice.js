import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelAction } from './channelsSlice';

const messagelAdapter = createEntityAdapter();
const initialState = messagelAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addMessage: messagelAdapter.addOne,
    addMessages: messagelAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelAction.removeChannel, (state, action) => {
      const { channelId } = action.payload;
      const updateMessages = Object.values(state.entities).filter((e) => e.channelId !== channelId);
      messagelAdapter.setAll(state, updateMessages);
    });
  },
});

export const selectors = messagelAdapter.getSelectors((state) => state.messages);
export const { actions } = messageSlice;
export default messageSlice.reducer;
