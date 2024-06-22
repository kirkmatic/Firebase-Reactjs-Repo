import React from 'react'
import service1 from '../assets/1.png';
import service2 from '../assets/2.png';

const ServicesSection = () => {

  return (
  <>
    <section className= 'bg-cover bg-center w-full min-h-screen px-8 py-8 flex flex-col items-center'>
        <div>
          <h1 className="text-red-400 text-center text-6xl font-['Montserrat'] font-extrabold mb-8">Our Services</h1>
          <p className="text-red-300 text-center max-w-6xl text-2xl font-['Montserrat'] font-medium mb-4">
          We offer a range of artistic services to bring your visions to life. Each service is tailored to meet your unique needs and preferences.
        </p>
        </div>

        <div className='max-w-7xl m-auto p-7 flex flex-wrap justify-center'>

          <div className='m-2 p-2 max-w-md  cursor-pointer box-border align-middle bg-white shadow-lg rounded-2xl'>
            <img src={service1} alt='Traditional Portraits' className='rounded-md mb-1' />
            <h2 className="font-['Montserrat'] text-red-400 text-3xl font-bold mb-1">Traditional Portraits</h2>
              <p className="font-['Montserrat'] text-black text-lg font-medium text-left px-2 mb-3">Our artists specialize in creating lifelike portraits that capture the true essence and beauty of the subject.</p>
          </div>

          <div className='m-2 p-2 max-w-md cursor-pointer box-border align-middle bg-white shadow-lg rounded-2xl'>
            <img src={service2}  alt='Digital Portraits' className='rounded-md mb-1'/>
            <h2 className="text-red-400 text-3xl font-bold mb-1">Digitalized Portraits</h2>
            <p className="text-black text-lg font-medium text-left  mb-3">Our artists specialize in creating lifelike portraits that capture the true essence and beauty of the subject.</p>
          </div>
        </div>

    </section>
  </>
  )
}

export default ServicesSection