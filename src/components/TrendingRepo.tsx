import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrendingRepo, trendingRepoActions } from '../store/TrendingRepoSlice';
import organisation from '../assets/organisation.png';
import repoIcon from '../assets/repo.png';
import lanIcon from '../assets/language.png';
import starIcon from '../assets/star.png';
import forkIcon from '../assets/fork.png'
import Loading from './Loading';

const TrendingRepo = () => {
    const navigate = useNavigate()

    if(!localStorage.getItem('accessToken')){
        navigate('/')
    }

    const dispatch = useDispatch()
    const trendingRepos = useSelector((state:any) => state.trendingRepo.trending)
    const fetching = useSelector((state:any) => state.trendingRepo.fetching)

    useEffect(() => {
        dispatch(getTrendingRepo())
    },[dispatch])

    const handleSortBy = (event:any) => {
        dispatch(trendingRepoActions.sortRepo(event.target.value))
    }

    return (
    <div className='px-[17%] max-md:px-[10%] max-sm:px-[5%]'>
        <div className='flex items-center h-[60px]'>
            <p className='text-2xl font-semibold text-left'>Trending Repositories</p>
            <div className='flex-1'></div>
            <div className='inline flex items-center'>
                <p className='px-3'>Sort by</p>
                <select defaultValue={'none'} className='p-1 rounded' onChange={handleSortBy}>
                    <option value='none'>None</option>
                    <option value='repository'>Repository Name</option>
                    <option value='language'>Language</option>
                    <option value='stars'>Stars</option>
                    <option value='forks'>Fork</option>
                </select>
            </div>
        </div>
        {fetching &&  <span className='flex justify-center mt-[15%]'><Loading/></span>}
        {!fetching && trendingRepos?.length > 0 && <>{
            trendingRepos.map((repo:any,index:number) => (
            <div key={index} className='shadow-lg flex flex-col items-start p-3 my-6'>
                <Link to={`/${repo.organisation}/${repo.repository}`}><p className='text-xl flex items-center mb-2 font-semibold truncate'><img src={repoIcon} className='h-[20px] px-3'  alt="repo"/>{repo.repository}</p></Link>
                <p className='text-xl flex items-center mb-2'><img src={organisation} className='h-[20px] px-3 truncate'  alt="org"/>{repo.organisation}</p>
                <p className='text-base flex items-center mb-2'></p>
                <div className='flex'>
                    <span className='flex items-center pr-3'><img src={lanIcon} className='h-[15px] px-3' alt="lan"/>{repo.language}</span>
                    <span className='flex items-center px-3'><img src={starIcon} className='h-[15px] inline px-2' alt="star"/>{repo.stars} &nbsp;</span>
                    <span className='flex items-center px-3'><img src={forkIcon} className='h-[15px] inline'  alt="forks"/>{repo.forks}</span>
                </div>
            </div>))
        }</>}
        {!fetching && trendingRepos?.length === 0 && <h2>No trending repo</h2>}
    </div>)
}

export default TrendingRepo;