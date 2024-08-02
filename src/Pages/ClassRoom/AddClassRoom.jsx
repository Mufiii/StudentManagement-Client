import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { fetchAllClassRooms } from '../../Redux/Actions/Action';

const AddClassRoom = ({ isOpen, handleClose }) => {

  const [formData, setFormData] = useState({
    name: '',
    division: '',
    capacity: '',
  }); const [classNames, setClassNames] = useState([]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Fetch class names from the backend
    const fetchClassNames = async () => {
      try {
        const authToken = JSON.parse(localStorage.getItem('authToken'));
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/admins/classroom/`, {
          headers: {
            Authorization: `Bearer ${authToken.access}`,
          },
        });
        const uniqueClassNames = [...new Set(response.data.map(item => item.name))];
        console.log(uniqueClassNames,'9999999');
        setClassNames(uniqueClassNames);
      } catch (error) {
        console.error('Error fetching class names:', error);
      }
    };

    fetchClassNames();
  }, []);


  const AddNewClassRoom = async (e) => {
    e.preventDefault()
    try {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/admins/classroom/`, {
        name: formData.name,
        division: formData.division,
        capacity: formData.capacity,
      }, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      console.log('New Route Created successfully:', response.data);
      handleClose(); // Close the modal
      dispatch(fetchAllClassRooms());
    } catch (error) {
      console.error('Error creating route:', error);
    }
  }
  return (
    <div>
      <Dialog open={isOpen} handler={handleClose}>
        <DialogHeader>Add New Classroom</DialogHeader>
        <DialogBody  divider>
          <form onSubmit={AddNewClassRoom} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Name
              </label>
              <select
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="" disabled>Select a class name</option>
                {classNames.map((className, index) => (
                  <option key={index} value={className}>
                    {className}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="grade" className="mb-2 text-sm font-bold text-gray-900">Division</label>
              <input
                type="text"
                name="division"
                value={formData.division}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Division"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="capacity" className="mb-2 text-sm font-bold text-gray-900">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Capacity"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg py-2.5 px-5 hover:bg-blue-600"
            >
              Add Classroom
            </button>
          </form>
        </DialogBody>
      </Dialog>
    </div>
  )
}

export default AddClassRoom