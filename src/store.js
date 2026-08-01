import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFromApi } from './api';

const resourceNames = ['posts', 'comments', 'albums', 'photos', 'todos', 'users'];

export const fetchResource = createAsyncThunk('resources/fetchResource', async (resource) => {
  // Use centralized fetch helper so endpoints are not exposed to UI
  const data = await fetchFromApi(resource);
  return { resource, data };
});

const initialState = resourceNames.reduce((acc, resource) => {
  acc[resource] = {
    items: [],
    status: 'idle',
    error: null,
  };
  return acc;
}, {});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResource.pending, (state, action) => {
        const resource = action.meta.arg;
        state[resource].status = 'loading';
        state[resource].error = null;
      })
      .addCase(fetchResource.fulfilled, (state, action) => {
        const { resource, data } = action.payload;
        state[resource].status = 'succeeded';
        state[resource].items = data;
      })
      .addCase(fetchResource.rejected, (state, action) => {
        const resource = action.meta.arg;
        state[resource].status = 'failed';
        state[resource].error = action.error.message;
      });
  },
});

export const store = configureStore({
  reducer: {
    resources: resourcesSlice.reducer,
  },
});
