import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/AuthSlice';
import { getAccessToken } from './store/AuthSlice';
import { getUserDetails } from './store/AuthSlice';
import { Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TrendingRepo from './components/TrendingRepo';


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

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trending" element={<TrendingRepo/>}/>
      </Routes>
    </div>
  );
}

export default App;
