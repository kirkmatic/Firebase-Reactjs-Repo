import React from 'react';

const AboutSection = () => {
  return (
    <section className="bg-cover bg-center w-full min-h-screen px-9 py-12 flex justify-center items-center gap-20">
      <div className="mb-12 w-full max-w-2xl">
        <div className="bg-about-section w-[600px] min-h-[600px] bg-cover bg-center"></div>
      </div>
      <div className="max-w-xl text-left">
        <h1 className="text-red-400 text-6xl font-extrabold mb-8">About Us</h1>
        <p className="text-black text-xl font-medium mb-8 text-justify">
          We are a team of passionate artists dedicated to bringing your memories to life through stunning, lifelike portraits. With years of experience and a deep love for our craft, we strive to capture the true essence and beauty of our subjects in every piece we create.
          Our mission is to create art that not only reflects the outer appearance but also tells a story and evokes emotion. We believe that a portrait should be a cherished keepsake, a lasting memory that holds a special place in your heart.
          Each member of our team brings their unique style and perspective to the table, ensuring that every portrait is a true collaboration. We take pride in our attention to detail and our ability to capture the personality and spirit of our subjects.
          We use only the highest quality materials to ensure that your portrait stands the test of time. Our commitment to excellence means that we are constantly honing our skills and staying up-to-date with the latest techniques and trends in the art world. 
          Whether you are looking for a portrait of a loved one, a pet, or a special place, we are here to bring your vision to life. We look forward to working with you and creating a piece of art that you will treasure forever.
        </p>
      </div>
    </section>
  );
}

export default AboutSection;
