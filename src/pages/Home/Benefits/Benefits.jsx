import BenefitCard from './BenefitCard';

import liveTrackingImg from '../../../assets/live-tracking.png';
import safeDeliveryImg from '../../../assets/safe-delivery.png';
import supportImg from '../../../assets/safe-delivery.png';
// import supportImg from '../../../assets/24X7support.png';

const benefits = [
  {
    id: 1,
    title: 'Live Parcel Tracking',
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    image: liveTrackingImg,
  },
  {
    id: 2,
    title: '100% Safe Delivery',
    description:
      'We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.',
    image: safeDeliveryImg,
  },
  {
    id: 3,
    title: '24/7 Call Center Support',
    description:
      'Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.',
    image: supportImg,
  },
];

const Benefits = () => {
  return (
    <div className="bg-none py-16">
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Benefits
        </h2>

        <div className="flex flex-col gap-6">
          {benefits.map(benefit => (
            <BenefitCard
              key={benefit.id}
              title={benefit.title}
              description={benefit.description}
              image={benefit.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
