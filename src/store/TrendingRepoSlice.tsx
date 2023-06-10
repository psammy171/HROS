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
        sortRepo(state,action){
            if(action.payload !== 'none')
            if(action.payload === 'stars' || action.payload === 'forks'){
                state.trending = state.trending.sort((a:any, b:any) => a[action.payload] - b[action.payload])
            }else {
                state.trending = state.trending.sort((a:any, b:any) => {
                    if(a[action.payload].toUpperCase() > b[action.payload].toUpperCase())
                        return 1
                    if(a[action.payload].toUpperCase() < b[action.payload].toUpperCase())
                        return -1
                    return 0
                })
            }
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