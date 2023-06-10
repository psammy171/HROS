import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRepoDetails } from "../store/RepoSlice";
import starIcon from '../assets/star.png';
import forkIcon from '../assets/fork.png';
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const RepoDetail = () => {
    const navigate = useNavigate()

    if(!localStorage.getItem('accessToken')){
        navigate('/')
    }

    const dispatch = useDispatch()
    const { organisation, repository} = useParams()
    const repo = useSelector((state:any) => state.repo)

    useEffect(() => {
        dispatch(getRepoDetails(organisation,repository))
    },[dispatch,organisation,repository])

    
    return (
    <div className='px-[17%] max-md:px-[10%] max-sm:px-[5%] flex items-start flex-col min-h-screen'>
        <p className='text-2xl font-semibold text-left pt-5 dark:text-[#11710d]'>Repo details</p>
        {repo.fetching && <span className='flex justify-center mt-[15%] w-full'><Loading/></span>}
        {!repo.fetching && 
        <div className='rounded shadow-lg p-3 my-10 flex flex-col items-start  dark:bg-[#0f172a]'>
            <p className='text-2xl text-[#11710d] font-bold dark:text-[#fcfcfc]'>{repo.repository}</p>
            <p className='font-semibold mt-2 dark:text-[#fcfcfc]'>Organisation : {repo.organisation}</p>
            <p className='dark:text-[#fcfcfc]'>{repo.language}</p>
            <div className='flex my-3'>
                <span className='flex items-center mr-4 dark:text-[#fcfcfc]'><img src={starIcon} className='h-[15px] inline pr-2' alt="star"/>Stars : {repo.stars}</span>
                <span className='flex items-center mx-4 dark:text-[#fcfcfc]'><img src={forkIcon} className='h-[15px] inline px-2' alt="fork"/>Forks : {repo.forks}</span>
            </div>
            <p className='dark:text-[#fcfcfc]'>{repo.tagLine}</p>
            <p className='text-left mt-2 dark:text-[#fcfcfc]'>{repo.description}</p>
        </div>}
    </div>)
}

export default RepoDetail;