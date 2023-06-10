import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    trending : [],
    fetching : false,
}

const repoSlice = createSlice({
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
        dispatch(repoActions.setFetching(true))

        fetch('http://localhost:4000/trending')
        .then(res => res.json())
        .then(data => {
            dispatch(repoActions.setTrendingRepo(data))
            dispatch(repoActions.setFetching(false))
        }).catch(err => {
            dispatch(repoActions.setFetching(false))
        })
    }
}

export const repoActions = repoSlice.actions
export default repoSlice;