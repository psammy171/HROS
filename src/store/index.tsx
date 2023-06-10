import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice';
import repoSlice from './RepoSlice';

const store = configureStore({
    reducer:{auth:authSlice.reducer,repo:repoSlice.reducer}
})

export default store;