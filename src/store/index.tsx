import { configureStore } from '@reduxjs/toolkit';
import authSlice from './AuthSlice';
import trendingRepoSlice from './TrendingRepoSlice';
import repoSlice from './RepoSlice';

const store = configureStore({
    reducer:{auth:authSlice.reducer,trendingRepo:trendingRepoSlice.reducer,repo:repoSlice.reducer}
})

export default store;