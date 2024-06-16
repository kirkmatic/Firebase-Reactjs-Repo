import React from 'react';

const HomeSection = () => {
  return (
    <section className="bg-home-section w-auto h-96 bg-cover bg-center px-1 py-16">
      <div className="max-w-2xl ml-28 text-left">
        <h1 className="text-red-100 text-5xl font-extrabold mb-6">Create a lasting memory that cherished forever</h1>
        <p className="text-red-100 text-lg font-medium mb-6">Our experienced artists specialize in creating stunning lifelike portraits that capture the true essence of their beauty</p>
        <button className='bg-red-400 font-bold rounded-xl text-red-100 h-10 w-auto text-2xl text-left px-3 py-1'>Message Us</button>
      </div>
    </section>
  );
}

export default HomeSection;
