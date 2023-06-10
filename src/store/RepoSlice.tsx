import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    'fetching':true,
    'repository':'',
    'organisation':'',
    'forks':'',
    'stars':'',
    'tagLine':'',
    'description':''
}

const repoSlice = createSlice({
    name:'repository',
    initialState,
    reducers:{
        setRepo(state,action){
            state.repository = action.payload.repository
            state.organisation = action.payload.organisation
            state.forks = action.payload.forks
            state.stars = action.payload.stars
            state.tagLine = action.payload.tagLine
            state.description = action.payload.description
        },
        setFetching(state,action){
            state.fetching = action.payload
        }
    }
})

export const getRepoDetails:any = (organisation:String, repository:String) => {
    return (dispatch:any) => {
        dispatch(repoActions.setFetching(true))
        fetch('http://localhost:4000/' + organisation + '/' + repository)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch(repoActions.setRepo({...data,repository,organisation,}))
            dispatch(repoActions.setFetching(false))
        }).catch(err => {
            console.log("Somthing went wrong", err)
            dispatch(repoActions.setFetching(false))
        })
    }
}

export const repoActions = repoSlice.actions
export default repoSlice;