import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllFeeds = createAsyncThunk('feeds/getFeeds', async () => {
  const res = await getFeedsApi();
  return res;
});
