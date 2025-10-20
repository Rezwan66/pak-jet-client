import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bannerImg1 from '../../../assets/banner/banner1.png';
import bannerImg2 from '../../../assets/banner/banner2.png';
import bannerImg3 from '../../../assets/banner/banner3.png';

const Banner = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      stopOnHover
      showStatus={false}
      interval={4000}
      transitionTime={1000}
      showArrows={false}
    >
      <div className="rounded-4xl">
        <img src={bannerImg1} />
        {/* <p className="legend">Legend 1</p> */}
      </div>
      <div className="rounded-4xl">
        <img src={bannerImg2} />
        {/* <p className="legend">Legend 2</p> */}
      </div>
      <div className="rounded-4xl">
        <img src={bannerImg3} />
        {/* <p className="legend">Legend 3</p> */}
      </div>
    </Carousel>
  );
};
export default Banner;
