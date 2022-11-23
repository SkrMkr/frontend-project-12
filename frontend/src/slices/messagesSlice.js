import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagelAdapter = createEntityAdapter();
const initialState = messagelAdapter.getInitialState();

const messageSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    addMessage: messagelAdapter.addOne,
    addMessages: messagelAdapter.addMany,
  },
});

export const selectors = messagelAdapter.getSelectors((state) => state.messages);
export const { actions } = messageSlice;
export default messageSlice.reducer;
