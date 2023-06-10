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

    return (<div className='flex items-center text-white px-[17%] max-md:px-[10%] max-sm:px-[5%] h-[50px] bg-[#11710d] sticky top-0'>
        {accessToken && 
        <>
            <Link to="/" className='text-2xl font-semibold'>Home</Link>
            <Link to="/repo" className='text-2xl font-semibold px-3'>Trending</Link>
            <div className='flex-1'></div>
            <p className='text-2xl font-semibold px-3 truncate'>{userName}</p>
            <img className='h-[25px] px-3' src={userAvatar} alt="avatar"/>
            <Link to="/" onClick={() => logout()} className='text-2xl font-semibold'>Logout</Link>
        </>}
        {!accessToken && 
        <>
            <div className='flex-1'></div>
            <button onClick={() => loginWithGithub()} className='text-2xl font-semibold'>Login</button>
        </>}
    </div>)
}

export default Header;