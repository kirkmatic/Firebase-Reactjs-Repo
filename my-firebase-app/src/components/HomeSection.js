import React from 'react';

const HomeSection = () => {
  return (
    <section className="bg-home-section w-full min-h-max bg-cover bg-center px-8 py-32">
      <div className="max-w-4xl ml-40 text-left">
        <h1 className="text-red-100 text-6xl font-extrabold mb-8">Create a lasting memory that is cherished forever</h1>
        <p className="text-red-100 text-2xl font-medium mb-8">Our experienced artists specialize in creating stunning lifelike portraits that capture the true essence of their beauty.</p>
        <button className='bg-red-400 font-bold rounded-xl text-red-100 h-10 w-auto text-xl text-left px-3 py-1'>Message Us</button>
      </div>
    </section>
  );
}

export default HomeSection;
