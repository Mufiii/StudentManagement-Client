import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchoolBusRoutes } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import { selectBusRoutes } from '../../../Redux/Slices/FetchBusRouteSlice';
import CreateRoute from './CreateRoute';
import RouteGetUpdateComp from './RouteGetUpdateComp';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';



const BusPointGetUpdateComp = () => {
  const dispatch = useDispatch();
  const routes = useSelector(selectBusRoutes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState(null);

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
    console.log(`Editing bus with ID: ${busId}`);
    setSelectedRouteId(busId)
    setIsOpenModal(true);
  };


  const handleditCloseModal = () => {
    setIsOpenModal(false);
  };


  return (
    <div className='max-h-[555px]  '>
      <div className='flex justify-between mb-4  sticky top-0 ' >
        <Typography variant="h2" color="blue-gray">
          Routes
        </Typography>
        <Button  className="text-white font-bold bg-[#8581B8]" onClick={handleOpenModal}>
          Add New Route
        </Button>
      </div>
      <div className='w-full max-h-[500px] overflow-y-auto'>
        {routes && routes.length > 0 ? (
          <Table>
            <TableHead className='sticky top-0 bg-gray-100 z-10'>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>Route Number</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>From Location</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>To Location</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Bus No</TableCell>
                <TableCell style={{ fontWeight: 'bold' }} >Actions</TableCell>
              </TableRow>
            </TableHead> 
            <TableBody> 
              {routes.map((bus) => (
                <TableRow key={bus.id}>
                  <TableCell >{bus.route_no}</TableCell>
                  <TableCell >{bus.from_location}</TableCell>
                  <TableCell >{bus.to_location}</TableCell>
                  <TableCell >{bus.bus}</TableCell>
                  
                  <TableCell >
                    <IconButton onClick={() => handleBusPointEditModal(bus.id)} style={{ backgroundColor: 'transparent' }}>
                      <FaRegEdit size={25} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(bus.id)} style={{ backgroundColor: 'transparent' }}>
                      <MdDelete />
                    </IconButton>
                  </TableCell>


                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No Routes available</Typography>
        )}
      </div>
      <CreateRoute isOpen={isModalOpen} handleClose={handleCloseModal} />
      <RouteGetUpdateComp
        isOpen={isOpenModal}
        handleClose={handleditCloseModal}
        routeId={selectedRouteId}
      />
    </div >
  );
};

export default BusPointGetUpdateComp;
