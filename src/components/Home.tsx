import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const Home = () => {
    const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)

    return (<>
        <h2>Home page</h2>
        {isAuthenticated && <Link to="/trending">View repo</Link>}
    </>)
}

export default Home;