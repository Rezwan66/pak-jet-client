import ServiceCard from './ServiceCard';

const serviceData = [
  {
    title: 'Express & Standard Delivery',
    description:
      'We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.',
  },
  {
    title: 'Nationwide Delivery',
    description:
      'We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.',
  },
  {
    title: 'Fulfillment Solution',
    description:
      'We also offer customized service with inventory management support, online order processing, packaging, and after sales support.',
  },
  {
    title: 'Cash on Home Delivery',
    description:
      '100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.',
  },
  {
    title: 'Corporate Service / Contract In Logistics',
    description:
      'Customized corporate services which includes warehouse and inventory management support.',
  },
  {
    title: 'Parcel Return',
    description:
      'Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.',
  },
];

const OurServices = () => {
  return (
    <section className="bg-[#03373D] py-16 px-10 rounded-4xl">
      <div className="container mx-auto text-center space-y-8">
        <div className="max-w-[718px] mx-auto text-white">
          <h2 className="text-4xl font-semibold mb-5">Our Services</h2>
          <p className=" mb-5">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
