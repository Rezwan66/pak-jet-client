import { useLoaderData } from 'react-router';
import GermanyMap from './GermanyMap';
import { useState } from 'react';

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchQuery, setSearchQuery] = useState('');
  console.log(searchQuery);
  //   console.log(serviceCenters);
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 ">
          We are available across Germany 🇩🇪
        </h2>
        <p className="text-slate-600 dark:text-slate-500 text-center mb-8">
          Covering all 16 federal states and major cities for fast, reliable
          parcel delivery.
        </p>

        {/* Search box */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search city or district (e.g., Magdeburg, Berlin)..."
            className="input input-bordered w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#CAEB66]"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <GermanyMap
          serviceCenters={serviceCenters}
          selectedCity={searchQuery}
        />
      </div>
    </>
  );
};
export default Coverage;
