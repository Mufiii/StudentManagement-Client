import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBusData } from '../../../Redux/Slices/fetchBusDataSlice'
import { fetchSchoolBus, fetchSchoolBusPoints } from '../../../Redux/Actions/Action'
import { Button, Card, IconButton, Typography } from '@material-tailwind/react'
import { selectBusPoints } from '../../../Redux/Slices/fetchBuspointsSlice'
import CreateBusPoint from './CreateBusPoint'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BusPoints = () => {

  const dispatch = useDispatch()
  const buspoints = useSelector(selectBusPoints)
  const [isModalOpen, setIsModalOpen] = useState(false);


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

  return (
    <div>
      <div className='flex justify-between mb-4'>
        <Typography variant="h2" color="blue-gray">
          School Bus Points
        </Typography>
        <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold" onClick={handleOpenModal}>
          Add New Bus Point
        </Button>
      </div>
      <div className='w-full overflow-x-auto'>
        {buspoints && buspoints.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>S.No</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Bus Point</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Fees</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buspoints.map((bus, index) => (
                <TableRow key={index}>
                  <TableCell className='text-sm font-bold'>{index + 1}</TableCell>
                  <TableCell className='text-sm font-bold'>{bus.name}</TableCell>
                  <TableCell className='text-sm font-bold'>{bus.fee}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditModal(bus.id)}>
                      <FaRegEdit size={25} />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(bus.id)}>
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        ) : (
          <Typography>No buspoints available</Typography>
        )}
      </div>
      <CreateBusPoint isOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  )
}

export default BusPoints