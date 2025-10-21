import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurServices/OurServices';
import ClientLogoMarquee from '../OurClients/ClientLogoMarquee';
import Benefits from '../Benefits/Benefits';
import BeMerchant from '../BeMerchant/BeMerchant';

const Home = () => {
  return (
    <div>
      <Banner />
      <OurServices />
      <ClientLogoMarquee />
      <Benefits />
      <BeMerchant />
    </div>
  );
};

export default Home;
