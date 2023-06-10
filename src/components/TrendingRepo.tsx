import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrendingRepo } from '../store/TrendingRepoSlice';

const TrendingRepo = () => {
    const dispatch = useDispatch()
    const trendingRepos = useSelector((state:any) => state.trendingRepo.trending)
    const fetching = useSelector((state:any) => state.trendingRepo.fetching)

    useEffect(() => {
        dispatch(getTrendingRepo())
    },[dispatch])

    return (<>
        <h2>Trending repo page</h2>
        {fetching && <h2>Fetching . . .</h2>}
        {!fetching && trendingRepos?.length > 0 && <>{
            trendingRepos.map((repo:any,index:number) => (<div key={index}>
                <p>{repo.repository}</p>
                <p>{repo.organisation}</p>
                <p>{repo.language}</p>
                <div>
                    <p>Stars : {repo.stars} &nbsp;</p>
                    <p>Forks : {repo.forks}</p>
                </div>
                <Link to={`/${repo.organisation}/${repo.repository}`}>View Details</Link>
            </div>))
        }</>}
        {!fetching && trendingRepos?.length === 0 && <h2>No trending repo</h2>}
    </>)
}

export default TrendingRepo;