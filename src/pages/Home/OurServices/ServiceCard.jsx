import React from 'react';
import {
  FaTruck,
  FaMoneyBillWave,
  FaBox,
  FaExchangeAlt,
  FaBuilding,
  FaRegCheckCircle,
} from 'react-icons/fa';

const iconMap = {
  'Express & Standard Delivery': <FaTruck />,
  'Nationwide Delivery': <FaTruck />,
  'Fulfillment Solution': <FaBox />,
  'Cash on Home Delivery': <FaMoneyBillWave />,
  'Corporate Service / Contract In Logistics': <FaBuilding />,
  'Parcel Return': <FaExchangeAlt />,
};

const ServiceCard = ({ service }) => {
  const { title, description } = service;
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center space-y-4 hover:bg-[#CAEB66] cursor-pointer transition-all duration-300 ease-in-out group">
      <div className="text-4xl text-[#03373D] group-hover:text-white]">
        {iconMap[title]}
      </div>
      <h3 className="text-xl font-semibold text-center text-[#03373D]">
        {title}
      </h3>
      <p className="text-sm text-[#606060] text-center">{description}</p>
    </div>
  );
};

export default ServiceCard;
