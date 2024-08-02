import { Typography } from '@material-tailwind/react'
import React from 'react'
import { useLocation } from 'react-router-dom';

const AddBusService = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');

  // Use the userId as needed in your component
  console.log('User ID:', userId);


  return (
    <div>
      <h1>Add Service for User {userId}</h1>
      <Typography variant='h2'>Add Bus Service</Typography>
      <div className='flex mt-5 gap-5'>
        <div className='flex flex-col'>
          <label htmlFor="">Search for Students</label>
          <input
            type="text"
            name="pen_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a student" required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Search for a buspoint</label>
          <input
            type="text"
            name="pen_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for a buspoint" required
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="">Annual fees</label>
          <input
            type="text"
            name="pen_no"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Annual fees" required
          />
        </div>
      </div>

    </div>
  )
}

export default AddBusService