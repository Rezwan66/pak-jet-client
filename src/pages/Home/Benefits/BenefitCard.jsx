const BenefitCard = ({ title, description, image }) => {
  return (
    <div className="card card-side w-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col md:flex-row items-center md:gap-10">
      {/* Left Image */}
      <figure className="">
        <img
          src={image}
          alt={title}
          className="md:h-32 md:w-32 w-24 h-24 object-cover max-w-32"
        />
      </figure>

      <div className="divider divider-horizontal text-[#03373D]"> </div>

      {/* Right Content */}
      <div className="card-body">
        <h3 className="card-title text-[#03373D] text-xl">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default BenefitCard;
