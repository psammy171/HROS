import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/AuthSlice';
import { getAccessToken } from './store/AuthSlice';
import { getUserDetails } from './store/AuthSlice';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TrendingRepo from './components/TrendingRepo';
import RepoDetail from './components/RepoDetail';
import NotFound from './components/NotFound';


const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const code = urlParams.get('code')
  const [mode,setMode] = useState(localStorage.getItem('mode') || '')

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

  const toggleMode = () => {
    if(mode === ''){
      setMode('dark')
      localStorage.setItem('mode','dark')
    }else{
      setMode('')
      localStorage.setItem('mode','')
    }
  }

  return (
    <div className={mode}>
      <div className='bg-white dark:bg-[#1e293b]'>
        <Header toggleMode={toggleMode} mode={mode}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/repo" element={<TrendingRepo/>}/>
          <Route path="repo/:organisation/:repository" element={<RepoDetail/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
