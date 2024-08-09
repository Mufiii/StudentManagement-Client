import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBusPoints } from '../../../Redux/Slices/fetchBuspointsSlice.jsx';
import { fetchSchoolBusPoints } from '../../../Redux/Actions/Action.jsx';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import CreateBusPoint from './CreateBusPoint.jsx';
import UpdateBusPoint from './UpdateBusPoint.jsx';
import ConfirmationModal from '../../../utils/ConfirmationModal.jsx';

const BusPoints = () => {
  const dispatch = useDispatch();
  const buspoints = useSelector(selectBusPoints);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedBusPointId, setSelectedBusPointId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchSchoolBusPoints())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBusPointEditModal = (busId) => {
    setSelectedBusPointId(busId);
    setIsOpenModal(true);
  };

  const handleBusPointEditCloseModal = () => {
    setIsOpenModal(false);
  };

  const openConfirmationModal = (busPointId) => {
    setSelectedBusPointId(busPointId);
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_SERVER}/bus/buspoint/${selectedBusPointId}/`);
      setIsConfirmationOpen(false);
      dispatch(fetchSchoolBusPoints());
    } catch (error) {
      console.error('Error deleting bus point:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Typography variant="h2" color="blue-gray">
          School Bus Points
        </Typography>
        <Button
          style={{ backgroundColor: '#8581B8' }}
          className="text-white font-bold"
          onClick={handleOpenModal}
        >
          Add New Bus Point
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        {buspoints && buspoints.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>S.No</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Bus Point</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Fees</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buspoints.map((bus, index) => (
                <TableRow key={index}>
                  <TableCell className="text-sm font-bold">{index + 1}</TableCell>
                  <TableCell className="text-sm font-bold">{bus.name}</TableCell>
                  <TableCell className="text-sm font-bold">{bus.fee}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleBusPointEditModal(bus.id)}>
                      <FaRegEdit size={25} />
                    </IconButton>
                    <IconButton onClick={() => openConfirmationModal(bus.id)}>
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No bus points available</Typography>
        )}
      </div>
      <CreateBusPoint isOpen={isModalOpen} handleClose={handleCloseModal} />
      <UpdateBusPoint
        isOpen={isOpenModal}
        handleClose={handleBusPointEditCloseModal}
        busPointId={selectedBusPointId}
      />
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        handleConfirm={handleDelete}
        handleCancel={closeConfirmationModal}
        message="Are you sure you want to delete this bus point?"
      />
    </div>
  );
};

export default BusPoints;
