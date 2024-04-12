import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import React from 'react'

const initialState  = {
  isProfileComplete: localStorage.getItem('isProfileComplete') === 'true',
  isVerified: localStorage.getItem('isVerified') === 'true',
  status: 'idle',
  error: null,
};

export const fetchProfileStatus = createAsyncThunk(
  'profileCompletion/fetchProfileStatus',
  async (userId) => {
    const res = await axios.get('/api/users/${userId}/profile-status')
    return res.data;
  }
)

const ProfileCompletionSlice = createSlice({
  name: 'profileCompletion',
  initialState,
  reducers: {
    updateIsVerified(state, action){
      state.isVerified = action.payload;
      localStorage.setItem('isVerified', action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileStatus.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfileStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isProfileComplete = action.payload.isRegistered;
        localStorage.setItem('isProfileComplete', action.payload.isRegistered.toString());
      })
      .addCase(fetchProfileStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
})

export const {updateIsVerified} = ProfileCompletionSlice.actions;
export default ProfileCompletionSlice.reducer;
