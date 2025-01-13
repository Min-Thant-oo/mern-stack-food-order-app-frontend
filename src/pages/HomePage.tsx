import landing from '../assets/landing.png'
import appDownload from '../assets/appDownload.png'
import { Helmet } from 'react-helmet-async'

const HomePage = () => {

    return (

        <>
            <Helmet>
                <title>Home | SolarEats</title>
                <meta name="description" content="Welcome to SolarEats" />
            </Helmet>
            
            <div className='flex flex-col gap-12'>
                <div className="flex flex-col text-center bg-white rounded-lg shadow-md gap-5 py-8 -mt-16">
                    <h1 className="text-5xl font-bold tracking-tight text-orange-600">
                        Tuck into a takeaway today
                    </h1>
                    <span className="text-xl">Food is just a click away!</span>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    <img src={landing} />
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <span className="font-bold text-3xl tracking-tigher">
                            Order takeaway even faster
                        </span>
                        <span>Download the <span className='text-orange-500 font-bold'>SolarEats</span> App for faster ordering and personalised recommendations</span>
                        <img src={appDownload} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage