import React from 'react';
import service1 from '../assets/1.png';
import service2 from '../assets/2.png';

const ServicesSection = () => {
  const services = [
    {
      title: 'Traditional Portraits',
      description: 'Our artists specialize in creating lifelike portraits that capture the true essence and beauty of the subject.',
      icon: service1,
    },
    {
      title: 'Digitalized Portraits',
      description: 'Capture the unique personality of your furry friends with our custom pet portraits.',
      icon: service2,
    },
    // Add more services as needed
  ];

  return (
    <section className="bg-red-100 bg-cover bg-center w-full min-h-screen px-8 py-16 flex flex-col items-center">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-red-400 text-6xl font-extrabold mb-8">Our Services</h1>
        <p className="text-red-300 text-2xl font-medium mb-12">
          We offer a range of artistic services to bring your visions to life. Each service is tailored to meet your unique needs and preferences.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mx-16">
          {services.map((service, index) => (
            <div key={index} className="bg-white shadow-lg rounded-xl flex flex-col items-center p-6 w-full md:w-80 lg:w-80">
              <img src={service.icon} alt={service.title} className="w-24 h-24 mb-4"/>
              <div className="text-center">
                <h2 className="text-red-400 text-3xl font-semibold mb-4">{service.title}</h2>
                <p className="text-black text-lg font-medium px-4">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
