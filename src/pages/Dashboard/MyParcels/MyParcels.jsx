import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { useAxiosSecure } from '../../../hooks/useAxiosSecure';
import { FaEye, FaTrash, FaMoneyBill } from 'react-icons/fa';
import { formatDate } from '../../../utils/utilFunctions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    data: parcels = [],
    // isPending,
    refetch,
  } = useQuery({
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

  const handlePay = id => {
    console.log('Pay for parcel:', id);
    navigate(`/dashboard/payment/${id}`);
  };

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This parcel will be permanently deleted!',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonColor: '#e11d48', //red-600
      cancelButtonColor: '#6b7280', //gray-500
    });
    if (confirm.isConfirmed) {
      try {
        console.log('confirmed clicked id:>', id);
        axiosSecure.delete(`/parcels/${id}`).then(res => {
          if (res.data.deletedCount) {
            console.log('deleted parcel::>', res.data);
            // Show success message
            Swal.fire({
              title: 'Deleted!',
              text: 'Your parcel has been deleted.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          } else {
            throw new Error('Failed to delete parcel.');
          }
        });
      } catch (error) {
        Swal.fire(
          'Error!',
          error.message || 'Failed to delete parcel',
          'error'
        );
      }
    }
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
                <th>Title</th>
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
                    <td className="max-w-[180px] truncate">
                      {parcel.parcelName}
                    </td>
                    <td>
                      <span
                        className={`badge uppercase truncate text-xs ${
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
                        className={`badge uppercase text-xs ${
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
                      <div className="tooltip" data-tip="View parcel details">
                        <button
                          onClick={() => handleView(parcel)}
                          className="btn btn-sm btn-info text-white"
                        >
                          <FaEye />
                        </button>
                      </div>
                      <div
                        className="tooltip"
                        data-tip={
                          parcel.payment_status === 'paid'
                            ? 'Already paid'
                            : 'Pay for parcel'
                        }
                      >
                        <button
                          onClick={() => handlePay(parcel._id)}
                          className="btn btn-sm btn-success text-white"
                          disabled={parcel.payment_status === 'paid'}
                        >
                          <FaMoneyBill />
                        </button>
                      </div>
                      <div className="tooltip" data-tip="Delete parcel">
                        <button
                          onClick={() => handleDelete(parcel._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
