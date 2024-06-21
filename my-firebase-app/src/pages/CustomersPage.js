import React from 'react';
import ServicesSection from '../components/ServicesSection';
import ImageUploader from '../components/ImageUploader';
import NavBarLogout from '../components/NavBarLogout';

const CustomersPage = () => {
  return (
    <>
        <NavBarLogout />
        <ServicesSection />
        <ImageUploader />
    </>
  );
};

export default CustomersPage;
