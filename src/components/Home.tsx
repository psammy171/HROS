import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import welcome from '../assets/welcome.svg'

const Home = () => {
    const isAuthenticated = useSelector((state:any) => state.auth.isAuthenticated)

    return (
    <div className='flex items-center justify-center flex-col pt-10'>
        <img src={welcome} className='w-2/5' alt="home"/>
        <p className='text-4xl text-[#11710d]'>Welcome to <span className='font-bold'>HROS</span></p>
        {isAuthenticated && <Link to="/repo" className='rounded p-2 mt-10 text-2xl bg-[#11710d] text-white'>View repositories</Link>}
    </div>)
}

export default Home;