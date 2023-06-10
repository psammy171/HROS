import { useDispatch } from 'react-redux'
import { authActions } from '../store/AuthSlice'
import { useSelector } from "react-redux/es/exports"
import { Link } from 'react-router-dom'

const CLIENT_ID = "54bef3e167b607bc6edb"

const Header = () => {
    const dispatch = useDispatch()
    const userName = useSelector((state:any) => state.auth.userName)
    const userAvatar = useSelector((state:any) => state.auth.userAvatarLink) 
    const accessToken = localStorage.getItem('accessToken')

    const loginWithGithub = () => {
        window.location.assign('https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID)
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        dispatch(authActions.logout())
    }

    return (<div>
        {accessToken && <>
            <Link to="/">Home</Link>
            <h2>{userName}</h2>
            <img width="40px" height="40px" src={userAvatar} alt="avatar"/>
            <Link to="/" onClick={() => logout()}>Logout</Link>
        </>}
        {!accessToken && <button onClick={() => loginWithGithub()}>Login</button>}
    </div>)
}

export default Header;