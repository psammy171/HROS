import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated:false,
    userName:'',
    userAvatarLink:''
}

const authSlice = createSlice({
    name:'Authentication',
    initialState,
    reducers:{
        login(state){
            state.isAuthenticated = true
        },
        logout(state){
            state.isAuthenticated = false
            state.userName = ''
            state.userAvatarLink = ''
        },
        setName(state,action){
            state.userName = action.payload.userName
            state.userAvatarLink = action.payload.avatarLink
        }
    }
})

export const getAccessToken:any = (code:String) => {
    return (dispatch:any) => {
        fetch('http://localhost:4000/getAccessToken?code=' + code,{
            method:'GET',
        })
        .then(response => {
            console.log("res",response)
            if(response.ok){
                return response.json()
            }
        }).then(data => {
            if(data.access_token){
                localStorage.setItem('accessToken',data.access_token)
                dispatch(authSlice.actions.login())
            }else {
                throw new Error("Bad Verification code")
            }
        }).catch(err => {
            console.log("Something went wrong",err)
        })
    }
}

export const getUserDetails:any = () => {
    return (dispatch:any) => {
        fetch("http://localhost:4000/userDetails",{
            method:"GET",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => res.json())
        .then(data => {
            dispatch(authActions.setName({userName:data.name,avatarLink:data.avatar_url}))
            console.log("Data",data)
        })
    }
}

export const authActions = authSlice.actions
export default authSlice;