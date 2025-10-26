import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { useAxiosSecure } from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaMoneyBill } from 'react-icons/fa';
import { formatDate } from '../../../utils/utilFunctions';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], isPending } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  console.log(parcels);

  //   const [parcels, setParcels] = useState([]);

  // Handle actions
  const handleView = parcel => {
    console.log('View parcel:', parcel);
    // e.g. open modal or navigate(`/parcel/${parcel._id}`)
  };

  const handlePay = parcel => {
    console.log('Pay for parcel:', parcel);
    // handle payment logic here
  };

  const handleDelete = async id => {
    // if (window.confirm('Are you sure you want to delete this parcel?')) {
    //   await fetch(`http://localhost:5000/parcels/${id}`, { method: 'DELETE' });
    //   setParcels(prev => prev.filter(p => p._id !== id));
    // }
  };

  return (
    <>
      <div className=" px-6 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">📦 Your Parcels</h2>

        <div className="overflow-x-auto bg-base-100 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200 text-base-content">
              <tr className="">
                <th>#</th>
                <th>Type</th>
                <th>Created At</th>
                <th>Cost (€)</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {parcels.length > 0 ? (
                parcels.map((parcel, index) => (
                  <tr key={parcel._id} className="hover">
                    <td>{index + 1}</td>
                    <td>
                      <span
                        className={`badge text-xs ${
                          parcel.parcelType === 'document'
                            ? 'badge-info'
                            : 'badge-secondary'
                        } badge-outline`}
                      >
                        {parcel.parcelType}
                      </span>
                    </td>
                    <td>{formatDate(parcel.creation_date)}</td>
                    <td className="font-semibold">{parcel.cost.toFixed(2)}</td>

                    {/* Payment Status */}
                    <td>
                      <span
                        className={`badge text-xs ${
                          parcel.payment_status === 'paid'
                            ? 'badge-success'
                            : 'badge-error'
                        } text-white`}
                      >
                        {parcel.payment_status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="flex gap-3">
                      <button
                        onClick={() => handleView(parcel)}
                        className="btn btn-sm btn-info text-white"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handlePay(parcel)}
                        className="btn btn-sm btn-success text-white"
                        disabled={parcel.payment_status === 'paid'}
                      >
                        <FaMoneyBill />
                      </button>
                      <button
                        onClick={() => handleDelete(parcel._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-slate-500">
                    No parcels found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default MyParcels;
