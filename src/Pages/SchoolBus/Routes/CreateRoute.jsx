import React, { useState } from 'react';
import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import axios from 'axios';
import BusRoute from './BusRoute'; // Adjust the path as necessary
import { useDispatch } from 'react-redux';
import { fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';

const CreateRoute = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

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
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/bus/route/`, {
        route_no: formData.route_no,
        bus_no: formData.bus_no,
        from_location: formData.from_location,
        to_location: formData.to_location,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('New Route Created successfully:', response.data);
      handleClose(); // Close the modal
      dispatch(fetchSchoolBusRoutes());
    } catch (error) {
      console.error('Error creating route:', error);
    }
  };

  return (
    <div>
      <Dialog
        size="md"
        open={open}
        onClose={handleClose} // Ensure handleClose is used here
        className="bg-transparent shadow-none"
      >
        <Card className="p-6 overflow-y-auto">
          <Typography variant="h4" color="blue-gray">
            Add New Route
          </Typography>
          <form className="mt-2 mb-2 w-full max-w-screen-lg" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 mt-3 gap-6">
              <div className="flex flex-col">
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
                <input
                  type="text"
                  name="bus_no"
                  value={formData.bus_no}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Bus No"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6">
              <div className="flex flex-col">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="flex flex-col">
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
            <div className="flex justify-end gap-3">
              <Button style={{ backgroundColor: "#E4E5E7" }} className="mt-6 rounded-full text-white" onClick={handleClose}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#8581B8" }} className="mt-6 rounded-full text-white" type="submit">
                Add
              </Button>
            </div>
          </form>
        </Card>
      </Dialog>
      <BusRoute onOpenModal={handleOpen} />
    </div>
  );
};

export default CreateRoute;
