import React, { useState } from 'react';
import { Button, Card, Dialog, DialogBody, DialogHeader, DialogFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBusPoints, fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';
import { selectBusRoutes } from '../../../Redux/Slices/FetchBusRouteSlice';

const CreateBusPoint = ({ isOpen, handleClose }) => {

  const dispatch = useDispatch();
  const routeNumbers = useSelector(selectBusRoutes);

  const [formData, setFormData] = useState({
    route: '',
    name: '',
    fee: '',
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
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/bus/buspoint/`, {
        route: formData.route_no,
        name: formData.name,
        fee: formData.fee,
      }, {
        headers: {
          Authorization: `Bearer ${authToken.access}`,
        },
      });
      console.log('New BusPoint Created successfully:', response.data);
      handleClose();
      dispatch(fetchSchoolBusPoints());
    } catch (error) {
      console.error('Error creating Bus Point:', error);
    }
  };

  return (
    <Dialog open={isOpen} handler={handleClose}>
      <DialogHeader>Add New BusPoint</DialogHeader>
      <DialogBody divider>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 text-sm font-bold text-gray-900">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="route_no" className="mb-2 text-sm font-bold text-gray-900">
                Route No
              </label>
              <select
                id="route_no"
                name="route_no"
                value={formData.route_no}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option value="">Select Route No</option>
                {routeNumbers.map((route, index) => (
                  <option key={index} value={route.route_no}>
                    {route.route_no}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="fee" className="mb-2 text-sm font-bold text-gray-900">
                Monthly Charge
              </label>
              <input
                type="text"
                id="fee"
                name="fee"
                value={formData.fee}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Charge"
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

export default CreateBusPoint;

