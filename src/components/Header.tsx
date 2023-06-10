import { useSelector } from "react-redux/es/exports"

const Header = (props:any) => {
    const userName = useSelector((state:any) => state.auth.userName)
    const userAvatar = useSelector((state:any) => state.auth.userAvatarLink) 
    const accessToken = localStorage.getItem('accessToken')

    return (<div>
        {accessToken && <>
            <h2>{userName}</h2>
            <img width="40px" height="40px" src={userAvatar} alt="avatar"/>
        </>}
        {!accessToken && <button onClick={() => props.loginWithGithub()}>Login</button>}
    </div>)
}

export default Header;