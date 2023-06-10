import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/AuthSlice';
import { getAccessToken } from './store/AuthSlice';
import { getUserDetails } from './store/AuthSlice';

const CLIENT_ID = "54bef3e167b607bc6edb"

const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const code = urlParams.get('code')


  useEffect(() => {
    if(localStorage.getItem('accessToken')){
      dispatch(authActions.login())
    }else{
      if(code){
        dispatch(getAccessToken(code))
      }
    }
  },[dispatch,code])

  useEffect(() => {
    if(isAuthenticated){
      dispatch(getUserDetails())
    }
  },[isAuthenticated,dispatch])

  const loginWithGithub = () => {
    window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
  }
  return (
    <div className="App">
      <Header loginWithGithub={loginWithGithub}/>
    </div>
  );
}

export default App;
