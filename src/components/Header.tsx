import { useDispatch } from 'react-redux'
import { authActions } from '../store/AuthSlice'
import { useSelector } from "react-redux/es/exports"
import { Link } from 'react-router-dom'

const CLIENT_ID = "54bef3e167b607bc6edb"

const Header = (props:any) => {
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

    return (<div className='flex items-center text-white px-[17%] max-md:px-[10%] max-sm:px-[5%] h-[50px] bg-[#11710d] sticky top-0 dark:bg-[#0f172a]'>
        {accessToken && 
        <>
            <Link to="/" className='text-2xl font-semibold dark:text-[#ffffff]'>Home</Link>
            <Link to="/repo" className='text-2xl font-semibold px-3 dark:text-[#ffffff]'>Trending</Link>
            <div className='flex-1'></div>
            <p className='text-2xl font-semibold px-3 truncate dark:text-[#ffffff]'>{userName}</p>
            <img className='h-[25px] px-3' src={userAvatar} alt="avatar"/>
            <div className={`h-[20px] w-[40px] rounded-[10px]  bg-[#ffffff] flex ${props.mode === 'dark' ? 'justify-end' : 'justify-start'}`} onClick={() => props.toggleMode()}>
                <div className='h-[16px] w-[16px] bg-[#11710d] rounded-full m-[2px] dark:bg-[#0f172a]'>

                </div>
            </div>
            <Link to="/" onClick={() => logout()} className='text-2xl font-semibold dark:text-[#ffffff] pl-3'>Logout</Link>
        </>}
        {!accessToken && 
        <>
            <div className='flex-1'></div>
            <div className={`h-[20px] w-[40px] rounded-[10px]  bg-[#ffffff] flex ${props.mode === 'dark' ? 'justify-end' : 'justify-start'} mx-3`} onClick={() => props.toggleMode()}>
                <div className='h-[16px] w-[16px] bg-[#11710d] rounded-full m-[2px] dark:bg-[#0f172a]'>

                </div>
            </div>
            <button onClick={() => loginWithGithub()} className='text-2xl font-semibold dark:text-[#ffffff]'>Login</button>
        </>}
    </div>)
}

export default Header;