import React, { useState } from 'react';
import { Button, Card, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBus } from '../../../Redux/Actions/Action';
import { ImCross } from "react-icons/im";

const CreateSchoolBus = ({ isOpen, handleClose }) => {

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    bus_no: '',
    driver_name:'',
    plate_number:'',
    capacity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = JSON.parse(localStorage.getItem('authToken'));
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/bus/bus/`, {
        bus_no: formData.bus_no,
        driver_name:formData.driver_name,
        plate_number:formData.plate_number,
        capacity: formData.capacity,
      }, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      console.log('New BusPoint Created successfully:', response.data);
      handleClose();
      dispatch(fetchSchoolBus());
    } catch (error) {
      console.error('Error creating New Bus:', error);
    }
  };

  return (
    <Dialog open={isOpen} handler={handleClose}>
      <div className='flex  justify-between'>
      <DialogHeader>Add New Bus</DialogHeader>
      <DialogHeader><ImCross onClick={handleClose}/></DialogHeader>
      </div>
      <DialogBody divider>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6 ">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Bus Number
              </label>
              <input
                type="text"
                id="name"
                name="bus_no"
                value={formData.bus_no}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Bus Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Driver Name
              </label>
              <input
                type="text"
                id="driver_name"
                name="driver_name"
                value={formData.driver_name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Driver Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Vehicle Number
              </label>
              <input
                type="text"
                id="plate_number"
                name="plate_number"
                value={formData.plate_number}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Vehicle Number"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Capacity
              </label>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Capacity"
                required
              />
            </div>
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <Button style={{ backgroundColor: "#E4E5E7" }} className="rounded-full text-white" onClick={handleClose}>
              Cancel
            </Button>
            <Button style={{ backgroundColor: "#8581B8" }} className="rounded-full text-white" type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default CreateSchoolBus;

