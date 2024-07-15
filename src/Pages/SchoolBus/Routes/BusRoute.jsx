import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import { selectBusRoutes } from '../../../Redux/Slices/FetchBusRouteSlice';

const BusRoute = ({ onOpenModal }) => {
  console.log('BusRoute props:', { onOpenModal }); // Debugging line
  const dispatch = useDispatch();
  const routes = useSelector(selectBusRoutes);

  useEffect(() => {
    dispatch(fetchSchoolBusRoutes())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h4" color="blue-gray">
          Routes
        </Typography>
        <Button onClick={onOpenModal} style={{ backgroundColor: "#8581B8" }} className="text-white font-bold">
          Add New Route
        </Button>
      </div>
      <div className='flex flex-wrap gap-4'>
        {routes && routes.length > 0 ? (
          routes.map((bus, index) => (
            <div key={index} className='mb-2'>
              <Card className='w-44 h-44 flex items-center justify-center'>
                <div className='flex-col'>
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
    </div>
  );
};

export default BusRoute;
