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
    <div className='h-[555px] overflow-y-auto hide-scrollbar p-4 md:p-6'>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sticky top-0 z-10">
        <Typography
          variant="h2"
          color="blue-gray"
          className="text-center sm:text-left text-xl md:text-2xl font-bold mb-4 sm:mb-0"
        >
          School Bus Points
        </Typography>
        <Button
          style={{ backgroundColor: '#8581B8' }}
          className="text-white  "
          onClick={handleOpenModal}
        >
          Add New Bus Point
        </Button>
      </div>
      <div className="w-full overflow-x-auto">
        {buspoints && buspoints.length > 0 ? (
          <Table className="min-w-full border-collapse">
            <TableHead>
              <TableRow>
                <TableCell className="font-bold text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 border-b">
                  S.No
                </TableCell>
                <TableCell className="font-bold text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 border-b">
                  Bus Point
                </TableCell>
                <TableCell className="font-bold text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 border-b">
                  Fees
                </TableCell>
                <TableCell className="font-bold text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 border-b">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buspoints.map((bus, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  <TableCell className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 font-bold">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 font-bold">
                    {bus.name}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm md:text-base px-2 sm:px-4 py-2 font-bold">
                    {bus.fee}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    <IconButton
                      onClick={() => handleBusPointEditModal(bus.id)}
                      className='mr-2 p-2 '
                    >
                      <FaRegEdit size={20} />
                    </IconButton>
                    <IconButton onClick={() => openConfirmationModal(bus.id)}
                     className='sm:m-1 '>
                      <MdDelete size={20} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography className="text-center text-sm md:text-base">
            No bus points available
          </Typography>
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












































































// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectBusPoints } from '../../../Redux/Slices/fetchBuspointsSlice.jsx';
// import { fetchSchoolBusPoints } from '../../../Redux/Actions/Action.jsx';
// import { Button, IconButton, Typography } from '@material-tailwind/react';
// import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
// import { FaRegEdit } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
// import axios from 'axios';
// import CreateBusPoint from './CreateBusPoint.jsx';
// import UpdateBusPoint from './UpdateBusPoint.jsx';
// import ConfirmationModal from '../../../utils/ConfirmationModal.jsx';

// const BusPoints = () => {
//   const dispatch = useDispatch();
//   const buspoints = useSelector(selectBusPoints);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   const [selectedBusPointId, setSelectedBusPointId] = useState(null);
//   const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

//   useEffect(() => {
//     dispatch(fetchSchoolBusPoints())
//       .then((result) => console.log('Fetch success:', result))
//       .catch((err) => console.error('Fetch error:', err));
//   }, [dispatch]);

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleBusPointEditModal = (busId) => {
//     setSelectedBusPointId(busId);
//     setIsOpenModal(true);
//   };

//   const handleBusPointEditCloseModal = () => {
//     setIsOpenModal(false);
//   };

//   const openConfirmationModal = (busPointId) => {
//     setSelectedBusPointId(busPointId);
//     setIsConfirmationOpen(true);
//   };

//   const closeConfirmationModal = () => {
//     setIsConfirmationOpen(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_URL_SERVER}/bus/buspoint/${selectedBusPointId}/`);
//       setIsConfirmationOpen(false);
//       dispatch(fetchSchoolBusPoints());
//     } catch (error) {
//       console.error('Error deleting bus point:', error);
//     }
//   };

//   return (
//     <div className='h-[555px] overflow-y-auto hide-scrollbar'>  
//       <div className="flex justify-between mb-4  sticky top-0" >
//         <Typography variant="h2" color="blue-gray">
//           School Bus Points
//         </Typography>
//         <Button
//           style={{ backgroundColor: '#8581B8' }}
//           className="text-white font-bold"
//           onClick={handleOpenModal}
//         >
//           Add New Bus Point
//         </Button>
//       </div>
//       <div className="w-full overflow-x-auto">
//         {buspoints && buspoints.length > 0 ? (
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell style={{ fontWeight: 'bold' }}>S.No</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Bus Point</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Fees</TableCell>
//                 <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {buspoints.map((bus, index) => (
//                 <TableRow key={index}>
//                   <TableCell className="text-sm font-bold">{index + 1}</TableCell>
//                   <TableCell className="text-sm font-bold">{bus.name}</TableCell>
//                   <TableCell className="text-sm font-bold">{bus.fee}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleBusPointEditModal(bus.id)}
//                       className='mr-2'
//                       >
//                       <FaRegEdit size={25} />
//                     </IconButton>
//                     <IconButton onClick={() => openConfirmationModal(bus.id)}>
//                       <MdDelete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         ) : (
//           <Typography>No bus points available</Typography>
//         )}
//       </div>
//       <CreateBusPoint isOpen={isModalOpen} handleClose={handleCloseModal} />
//       <UpdateBusPoint
//         isOpen={isOpenModal}
//         handleClose={handleBusPointEditCloseModal}
//         busPointId={selectedBusPointId}
//       />
//       <ConfirmationModal
//         isOpen={isConfirmationOpen}
//         handleConfirm={handleDelete}
//         handleCancel={closeConfirmationModal}
//         message="Are you sure you want to delete this bus point?"
//       />
//     </div>
//   );
// };

// export default BusPoints;
