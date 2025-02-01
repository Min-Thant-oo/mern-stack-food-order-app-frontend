// import hero from '@/assets/hero.png';

const Hero = () => {

  const hero = 'https://res.cloudinary.com/dsrc9n3iy/image/upload/v1738392562/SolarEats/n6cpqgntjljq55viqysu.png'
  return (
    <div>
        <img 
          src={hero} 
          alt="Hero Image" 
          className='w-full max-h-[350px] object-cover' 
        />
    </div>
  )
}

export default Hero