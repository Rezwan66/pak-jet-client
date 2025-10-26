import React, { useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
// import { warehouses } from './warehouses';
import { useLoaderData } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useAxiosSecure } from '../../hooks/useAxiosSecure';

const generateTrackingID = () => {
  const date = new Date();
  const datePart = date.toISOString().split('T')[0].replace(/-/g, '');
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `PCL-${datePart}-${rand}`;
};

const SendParcel = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: user?.displayName || 'Name',
    },
  });
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();

  const [deliveryCost, setDeliveryCost] = useState(null);

  // Watch current values from form
  const parcelType = watch('parcelType');
  const parcelWeight = watch('parcelWeight');
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');

  // --- Region list (unique) ---
  const regionList = useMemo(
    () => [
      ...new Set((serviceCenters || []).map(s => s.region).filter(Boolean)),
    ],
    [serviceCenters]
  );
  //   another way----------->immediate/inline (fine for small arrays)
  // const uniqueRegions = [...new Set((serviceCenters || []).map(s => s.region).filter(Boolean))];

  // --- Filtered service centres by region ---
  const filteredSenderCenters = serviceCenters.filter(
    center => center.region === senderRegion
  );
  const filteredReceiverCenters = serviceCenters.filter(
    center => center.region === receiverRegion
  );

  // --- Delivery cost calculation ---
  const calculateCost = (type, weight = 0, sender, receiver) => {
    // returns { total: number, breakdown: { base, weightCharge, regionalSurcharge, sameRegion } }
    if (!sender || !receiver) {
      return {
        total: 0,
        breakdown: {
          base: 0,
          weightCharge: 0,
          regionalSurcharge: 0,
          sameRegion: false,
        },
      };
    }
    const sameRegion = sender.region === receiver.region;
    const w = parseFloat(weight) || 0;
    let base = 0;
    let weightCharge = 0;
    let regionalSurcharge = 0;
    // Document type: fixed cost regardless of weight
    if (type === 'document') {
      base = sameRegion ? 6.0 : 8.0;
    } else if (type === 'non-document') {
      if (w <= 3) {
        base = sameRegion ? 11.0 : 15.0;
      } else {
        // pricing: 4€/kg for every kg above (or for total weight), plus regional surcharge for inter-region
        weightCharge = 4.0 * w;
        regionalSurcharge = sameRegion ? 0 : 10.0;
      }
    }

    const total = parseFloat(
      (base + weightCharge + regionalSurcharge).toFixed(2)
    );
    return {
      total,
      breakdown: { base, weightCharge, regionalSurcharge, sameRegion },
    };
  };

  // --- Form submission ---
  const onSubmit = data => {
    const sender = serviceCenters.find(
      s => s.region === data.senderRegion && s.city === data.senderServiceCenter
    );
    const receiver = serviceCenters.find(
      s =>
        s.region === data.receiverRegion &&
        s.city === data.receiverServiceCenter
    );

    const costObj = calculateCost(
      data.parcelType,
      data.parcelWeight,
      sender,
      receiver
    );
    setDeliveryCost(costObj);

    // toast.success(`Estimated Delivery Cost: €${cost.toFixed(2)}`, {
    //   duration: 3000,
    //   position: 'top-right',
    // });

    Swal.fire({
      title: 'Confirm Delivery',
      html: `
    <div style="font-size: 1rem; text-align: left;">
      <p><b>Parcel Type:</b> ${data.parcelType}</p>
      <p><b>From:</b> ${data.senderRegion} (${data.senderServiceCenter}) → ${
        data.receiverRegion
      } (${data.receiverServiceCenter})</p>
      ${
        data.parcelType === 'non-document'
          ? `<p><b>Weight:</b> ${data.parcelWeight || '-'} kg</p>`
          : ''
      }
      <hr style="margin:10px 0;border:none;height:1px;background:#e5e7eb;opacity:0.7;">
      <div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between"><span>Base fee</span><strong>${
          costObj.breakdown.base ? '€' + costObj.breakdown.base.toFixed(2) : '-'
        }</strong></div>
        <div style="display:flex;justify-content:space-between"><span>Weight charge</span><strong>${
          costObj.breakdown.weightCharge
            ? '€' + costObj.breakdown.weightCharge.toFixed(2)
            : '-'
        }</strong></div>
        <div style="display:flex;justify-content:space-between"><span>Regional surcharge</span><strong>${
          costObj.breakdown.regionalSurcharge
            ? '€' + costObj.breakdown.regionalSurcharge.toFixed(2)
            : '-'
        }</strong></div>
      </div>
      <div style="border-top:1px solid #e5e7eb;padding-top:10px;margin-top:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-weight:600">Total</span>
          <span style="font-size:1.25rem;font-weight:800;color:#111">€${costObj.total.toFixed(
            2
          )}</span>
        </div>
      </div>
      <p style="margin-top:10px;color:#6b7280;font-size:0.9rem">You can proceed to payment or return to edit your details.</p>
    </div>
  `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '💳 Proceed to Payment',
      cancelButtonText: '✏️ Edit Details',
      confirmButtonColor: '#22c55e',
      cancelButtonColor: '#ef4444',
      background: '#ffffff',
      backdrop: `
    rgba(0,0,0,0.4)
    left top
    no-repeat
  `,
    }).then(result => {
      if (result.isConfirmed) {
        // Create parcel entry object
        const parcel = {
          ...data,
          cost: costObj.total,
          costBreakdown: costObj.breakdown,
          creation_date: new Date().toISOString(),
          payment_status: 'unpaid',
          delivery_status: 'not collected',
          created_by: user?.email,
          tracking_id: generateTrackingID(),
        };
        console.log(parcel);
        //save data to server

        axiosSecure.post('/parcels', parcel).then(res => {
          console.log(res.data);
          if (res.data.insertedId) {
            // redirect to payment gateway
            Swal.fire({
              title: 'Redirecting...',
              text: 'Proceed to payment gateway.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
        //   .catch(() => {
        //     Swal.fire({
        //       title: 'Error!',
        //       text: 'Something went wrong while saving the parcel.',
        //       icon: 'error',
        //       confirmButtonColor: '#ef4444',
        //     });
        //   });
      }
    });

    // console.log('📦 Parcel Summary:', {
    //   ...data,
    //   senderRegion: sender?.region,
    //   senderCenter: sender?.city,
    //   receiverRegion: receiver?.region,
    //   receiverCenter: receiver?.city,
    //   cost,
    //   creation_date: new Date().toISOString(),
    // });
  };

  return (
    <div className="max-w-full mx-auto py-20 px-6 lg:py-20 lg:px-24 bg-base-200 rounded-4xl">
      <h2 className="text-3xl font-bold">Add Parcel</h2>
      <div className="divider mt-10 mb-6"></div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <p className="mb-6 text-lg font-semibold text-gray-600">
          Enter your parcel details
        </p>
        {/* Parcel Info */}
        <fieldset className="fieldset">
          {/* <h2 className="text-xl font-semibold mb-4">Parcel Info</h2> */}

          <div className="form-control mb-6 flex flex-col">
            {/* <label className="label">Type</label> */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register('parcelType', { required: true })}
                  value="document"
                  className="radio radio-primary"
                />
                <span>Document</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register('parcelType', { required: true })}
                  value="non-document"
                  className="radio radio-primary"
                />
                <span>Non-document</span>
              </label>
            </div>

            {errors.parcelType && (
              <span className="text-red-500">Type is required</span>
            )}
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-between md:gap-10">
            <div
              className={`form-control mb-2 flex flex-col ${
                parcelType === 'non-document'
                  ? 'md:flex-1'
                  : 'lg:w-[48%] md:w-[47%]'
              }`}
            >
              <label className="label">Parcel Name</label>
              <input
                {...register('parcelName', { required: true })}
                className="input input-bordered w-full"
                placeholder="Parcel Name"
              />
              {errors.parcelTitle && (
                <span className="text-red-500">Title is required</span>
              )}
            </div>

            {parcelType === 'non-document' && (
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Parcel Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('parcelWeight')}
                  className="input input-bordered w-full"
                  placeholder="Weight in kg"
                />
              </div>
            )}
          </div>
        </fieldset>

        <div className="divider my-10"></div>

        {/* SEND AND RECEIVE INFO */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-between md:gap-10">
          {/* Sender Info */}
          <fieldset className="flex-1 fieldset">
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            {/* Sender Name && Sender Pickup Warehouse */}
            <div className="flex justify-between gap-2">
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Sender Name</label>
                <input
                  {...register('senderName', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Sender Name"
                  //   readOnly
                />
              </div>
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Your Region</label>
                <select
                  {...register('senderRegion', { required: true })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your region
                  </option>

                  {regionList.length === 0 ? (
                    <option value="" disabled>
                      No regions loaded
                    </option>
                  ) : (
                    regionList.map((w, i) => (
                      <option key={i} value={w}>
                        {w}
                      </option>
                    ))
                  )}
                </select>
                {errors.senderRegion && (
                  <span className="text-red-500">Region is required</span>
                )}
              </div>
            </div>
            {/* sender address and contact */}
            <div className="flex justify-between gap-2">
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Address</label>
                <input
                  {...register('senderAddress', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
                {errors.senderContact && (
                  <span className="text-red-500">Contact is required</span>
                )}
              </div>
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Sender Contact No.</label>
                <input
                  {...register('senderContact', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Phone or Email"
                />
                {errors.senderContact && (
                  <span className="text-red-500">Contact is required</span>
                )}
              </div>
            </div>
            {/* region */}

            <div className="form-control mb-2 flex flex-col">
              <label className="label">Sender Pickup Warehouse</label>
              <select
                {...register('senderServiceCenter', { required: true })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select pickup warehouse
                </option>

                {filteredSenderCenters.length === 0 ? (
                  <option value="" disabled>
                    No warehouses loaded
                  </option>
                ) : (
                  filteredSenderCenters.map((w, i) => (
                    <option key={i} value={w?.city}>
                      {w?.city}
                    </option>
                  ))
                )}
              </select>
              {errors.senderServiceCenter && (
                <span className="text-red-500">Service Center is required</span>
              )}
            </div>

            <div className="form-control mb-2 flex flex-col">
              <label className="label">Pickup Instruction</label>
              <textarea
                {...register('senderPickupInstruction', { required: false })}
                className="textarea textarea-bordered w-full"
                placeholder="Pickup instruction"
              />
              {/* {errors.senderPickupInstruction && (
                <span className="text-red-500">Instruction is required</span>
              )} */}
            </div>
          </fieldset>

          {/* Receiver Info */}
          <fieldset className="flex-1 fieldset">
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>
            {/* receiver name and warehouse */}
            <div className="flex justify-between gap-2">
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Name</label>
                <input
                  {...register('receiverName', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Receiver Name"
                />
                {errors.receiverName && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Receiver Region</label>
                <select
                  {...register('receiverRegion', { required: true })}
                  className="select select-bordered w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select your region
                  </option>

                  {regionList.length === 0 ? (
                    <option value="" disabled>
                      No regions loaded
                    </option>
                  ) : (
                    regionList.map((w, i) => (
                      <option key={i} value={w}>
                        {w}
                      </option>
                    ))
                  )}
                </select>
                {errors.receiverRegion && (
                  <span className="text-red-500">Region is required</span>
                )}
              </div>
            </div>
            {/* receiver contact and address */}
            <div className="flex justify-between gap-2">
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Receiver Address</label>
                <input
                  {...register('receiverAddress', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Address"
                />
                {errors.receiverAddress && (
                  <span className="text-red-500">
                    Receiver address is required
                  </span>
                )}
              </div>
              <div className="flex-1 form-control mb-2 flex flex-col">
                <label className="label">Receiver Contact No.</label>
                <input
                  {...register('receiverContact', { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Phone or Email"
                />
                {errors.receiverContact && (
                  <span className="text-red-500">Contact is required</span>
                )}
              </div>
            </div>
            {/* receiver region */}

            <div className="form-control mb-2 flex flex-col">
              <label className="label">Receiver Pickup Warehouse</label>
              <select
                {...register('receiverServiceCenter', { required: true })}
                className="select select-bordered w-full"
                defaultValue=""
              >
                <option value="" disabled>
                  Select pickup warehouse
                </option>

                {filteredReceiverCenters.length === 0 ? (
                  <option value="" disabled>
                    No warehouses loaded
                  </option>
                ) : (
                  filteredReceiverCenters.map((w, i) => (
                    <option key={i} value={w?.city}>
                      {w?.city}
                    </option>
                  ))
                )}
              </select>
              {errors.receiverServiceCenter && (
                <span className="text-red-500">Service Center is required</span>
              )}
            </div>

            <div className="form-control mb-2 flex flex-col">
              <label className="label">Delivery Instruction</label>
              <textarea
                {...register('receiverDeliveryInstruction', {
                  required: false,
                })}
                className="textarea textarea-bordered w-full"
                placeholder="Delivery instruction"
              />
              {/* {errors.receiverDeliveryInstruction && (
                <span className="text-red-500">Instruction is required</span>
              )} */}
            </div>
          </fieldset>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-black btn-block lg:w-2/5"
        >
          Calculate Delivery Cost
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
