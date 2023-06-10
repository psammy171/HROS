import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trending : [],
    fetching : false,
}

const trendingRepoSlice = createSlice({
    name:'Trending',
    initialState,
    reducers:{
        setTrendingRepo(state,action){
            state.trending = action.payload
        },
        setFetching(state,action){
            state.fetching = action.payload
        }
    }
})

export const getTrendingRepo:any = () => {
    return (dispatch:any) => {
        dispatch(trendingRepoActions.setFetching(true))

        fetch('http://localhost:4000/trending')
        .then(res => res.json())
        .then(data => {
            dispatch(trendingRepoActions.setTrendingRepo(data))
            dispatch(trendingRepoActions.setFetching(false))
        }).catch(err => {
            dispatch(trendingRepoActions.setFetching(false))
        })
    }
}

export const trendingRepoActions = trendingRepoSlice.actions
export default trendingRepoSlice;