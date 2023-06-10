import notFound from '../assets/notFound.svg'

const NotFound = () => {
    return (
        <div className='px-[17%] max-md:px-[10%] max-sm:px-[5%] flex items-center flex-col min-h-screen'>
            <img src={notFound} alt="404" className='w-3/5'/>
        </div>
    )
}

export default NotFound;