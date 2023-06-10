import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRepoDetails } from "../store/RepoSlice";

const RepoDetail = () => {
    const dispatch = useDispatch()
    const { organisation, repository} = useParams()
    const repo = useSelector((state:any) => state.repo)

    useEffect(() => {
        dispatch(getRepoDetails(organisation,repository))
    },[dispatch,organisation,repository])

    return (<>
        <h2>Repo details</h2>
        {repo.fetching && <p>Fetching . . .</p>}
        {!repo.fetching && <>
            <p>{repo.repository}</p>
            <p>{repo.organisation}</p>
            <p>{repo.language}</p>
            <div>
                <p>Stars : {repo.stars}</p>
                <p>Forks : {repo.forks}</p>
            </div>
            <p>{repo.tagLine}</p>
            <p>{repo.description}</p>
        </>}
    </>)
}

export default RepoDetail;