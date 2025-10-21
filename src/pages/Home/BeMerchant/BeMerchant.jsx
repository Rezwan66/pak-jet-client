import locationImg from '../../../assets/location-merchant.png';

const BeMerchant = () => {
  return (
    <>
      <div
        data-aos="zoom-in-up"
        className="bg-no-repeat bg-[#03373D] bg-[url('assets/be-a-merchant-bg.png')] rounded-4xl p-20"
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={locationImg} className="max-w-sm" />
          <div>
            <h1 className="text-5xl font-bold text-white">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="py-6 text-[#DADADA]">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
            <div className="flex flex-row gap-4">
              <button className="btn btn-success rounded-full">
                Become a Merchant
              </button>
              <button className="btn btn-outline btn-success rounded-full">
                Earn with Pakjet Courier
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BeMerchant;
