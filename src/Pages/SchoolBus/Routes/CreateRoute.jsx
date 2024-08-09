import React, { useState } from 'react';
import { Button, Card, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';
import { selectBusData } from '../../../Redux/Slices/fetchBusDataSlice';

const CreateRoute = ({ isOpen, handleClose }) => {

  const dispatch = useDispatch();
  const busNumbers = useSelector(selectBusData);

  const [formData, setFormData] = useState({
    route_no: '',
    bus_no: '',
    from_location: '',
    to_location: '',
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
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/bus/routes/`, {
        route_no: formData.route_no,
        bus: formData.bus_no,
        from_location: formData.from_location,
        to_location: formData.to_location,
      });
      console.log('New Route Created successfully:', response.data);
      window.location.reload();
      handleClose(); // Close the modal
      dispatch(fetchSchoolBusRoutes());
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  return (
    <Dialog open={isOpen} handler={handleClose}>
      <DialogHeader>Add New Route</DialogHeader>
      <DialogBody divider>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                Route No
              </label>
              <input
                type="text"
                name="route_no"
                value={formData.route_no}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Route No"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                Bus Number
              </label>
              <select
                name="bus_no"
                value={formData.bus_no}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Select Bus No</option>
                {busNumbers.map((bus, index) => (
                  <option key={index} value={bus.bus_no}>
                    {bus.bus_no}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="flex flex-col">
              <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                From Location
              </label>
              <input
                type="text"
                name="from_location"
                value={formData.from_location}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="From"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="flex flex-col">
              <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                To Location
              </label>
              <input
                type="text"
                name="to_location"
                value={formData.to_location}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="To"
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

export default CreateRoute;

