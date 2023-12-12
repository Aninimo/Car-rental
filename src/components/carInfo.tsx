import { useState } from 'react';
import { X } from 'lucide-react';
import { DateRange } from 'react-date-range';
import { differenceInDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import getStripe from '../services/stripe';
import { ICar } from '../interfaces';

interface Props {
  car: ICar;
}

export function CarInfo({ car }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const calculateRentalCost = () => {
    const { startDate, endDate } = state[0];

    if (startDate && endDate) {
      const numberOfDays = differenceInDays(endDate, startDate);
      const dailyRentalCost = car.price;
      const totalCost = numberOfDays * dailyRentalCost + car.price;

      return totalCost;
    }
    return 0;
  };

  const handleCheckout = async (selectedCar: ICar) => {
    const stripe = await getStripe();

    const totalCost = calculateRentalCost();

    const response: Response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        car: selectedCar,
        totalCost: totalCost,
      }),
    });

    if (response.status === 500) return;

    const data = await response.json();

    stripe.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <div className='flex md:flex-row items-center justify-center text-white sm:flex flex-col'>
      <img
        src={car.image.url}
        alt={car.name}
      />
      <div>
        <span>{car.name}</span>
        <h2 className='font-bold text-3xl'>{car.model}</h2>
        <p className='w-80 mt-4'>{car.description}</p>
        <button className='border p-2 px-6 md:px-12 rounded mt-4' onClick={openModal}>
          Rental Now
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center text-black'>
          <div className='bg-white p-8 rounded mt-4'>
            <button
              onClick={closeModal}
              data-testid='close-modal'>
              <X />
            </button>
            <div className='mt-4'>
              <div className='mb-4'>
                <p className='font-2xl'>Rental {car.name}</p>
                <p className='font-bold'>{car.model}</p>
                <p>Rental for R${car.price} per day</p>
              </div>
              <input
                placeholder='Enter pick-up location'
                className='p-2 rounded border w-full'
                required
              />
              <div className='flex flex-col md:flex-row items-center mt-4 gap-12'>
                <div>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection as any])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                  />
                </div>
                <div className='flex flex-col mt-4'>
                  <label>Time</label>
                  <input
                    placeholder='Time'
                    type='time'
                    className='p-2 rounded border w-full'
                    required
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center gap-8'>
              <p className='font-bold mt-4'>Total Cost: ${calculateRentalCost()}</p>
              <button
                className='border rounded p-2 px-6 md:px-12 mt-4 bg-blue-500 text-white'
                onClick={() => handleCheckout(car)}
              >
                Rental
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
