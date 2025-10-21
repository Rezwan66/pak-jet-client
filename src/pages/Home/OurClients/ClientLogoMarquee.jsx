import Marquee from 'react-fast-marquee';

import casio from '../../../assets/brands/casio.png';
import amazon from '../../../assets/brands/amazon.png';
import moonstar from '../../../assets/brands/moonstar.png';
import start from '../../../assets/brands/start.png';
import startPeople from '../../../assets/brands/start-people 1.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import randstad from '../../../assets/brands/randstad.png';

const logos = [
  casio,
  amazon,
  moonstar,
  start,
  startPeople,
  amazonVector,
  randstad,
];

const ClientLogoMarquee = () => {
  return (
    <section className="py-16 bg-none">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-10">
          {' '}
          We've helped thousands of sales teams{' '}
        </h2>

        <Marquee speed={50} gradient={false} pauseOnHover={true} loop={0}>
          {logos.concat(logos).map((logo, index) => (
            <div key={index} className="mx-20 flex items-center">
              <img
                src={logo}
                alt={`Brand ${index}`}
                className="h-6 w-32 object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
export default ClientLogoMarquee;
