import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTrendingRepo } from '../store/RepoSlice';

const TrendingRepo = () => {
    const dispatch = useDispatch()
    const trendingRepos = useSelector((state:any) => state.repo.trending)
    const fetching = useSelector((state:any) => state.repo.fetching)

    useEffect(() => {
        dispatch(getTrendingRepo())
    },[])

    console.log(trendingRepos)


    return (<>
        <Link to="/">Home</Link>
        <h2>Trending repo page</h2>
        {fetching && <h2>Fetching . . .</h2>}
        {!fetching && trendingRepos?.length > 0 && <><h2>Fetched trending repo</h2></>}
        {!fetching && trendingRepos?.length === 0 && <h2>No trending repo</h2>}
    </>)
}

export default TrendingRepo;