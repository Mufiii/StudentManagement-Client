import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import { selectBusRoutes } from '../../../Redux/Slices/FetchBusRouteSlice';
import CreateRoute from './CreateRoute'; // Adjust the import path if necessary
import RouteGetUpdateComp from './RouteGetUpdateComp';
import { FaRegEdit } from "react-icons/fa";

const BusRoute = () => {
  const dispatch = useDispatch();
  const routes = useSelector(selectBusRoutes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    dispatch(fetchSchoolBusRoutes())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditModal = (busId) => {
    // Open modal or perform any action based on busId
    console.log(`Editing bus with ID: ${busId}`);
    setIsOpenModal(true);
  };
  

  const handleditCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h4" color="blue-gray">
          Routes
        </Typography>
        <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold" onClick={handleOpenModal}>
          Add New Route
        </Button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {routes && routes.length > 0 ? (
          routes.map((bus, index) => (
            <div key={index} className='mb-2'>
              <Card className='w-44 h-44 flex items-center justify-center'>
                <div className='flex-col'>
                  <div>
                    <FaRegEdit size={25} onClick={() => handleEditModal(bus.id)}/>
                  </div>
                  <Typography className='text-sm font-bold'>Route No: {bus.route_no}</Typography>
                  <Typography className='text-sm font-bold'>From: {bus.from_location}</Typography>
                  <Typography className='text-sm font-bold'>To: {bus.to_location}</Typography>
                </div>
              </Card>
            </div>
          ))
        ) : (
          <Typography>No Routes available</Typography>
        )}
      </div>
      <CreateRoute isOpen={isModalOpen} handleClose={handleCloseModal} />
      <RouteGetUpdateComp isOpen={isOpenModal} handleClose={handleditCloseModal} />
    </div>
  );
};

export default BusRoute;
