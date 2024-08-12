import { Button, Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClassRooms } from '../../Redux/Slices/FetchAllClassroomSlice';
import { fetchAllClassRooms } from '../../Redux/Actions/Action';
import { FaList, FaCloudUploadAlt } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import AddClassRoom from './AddClassRoom';

const ClassRooms = () => {
  const [selectedClass, setSelectedClass] = useState(10);
  const [viewMode, setViewMode] = useState('grid'); 
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassRooms);

  useEffect(() => {
    dispatch(fetchAllClassRooms(selectedClass));
  }, [dispatch, selectedClass]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='max-h-[555px]'>
      <div className='flex justify-between mb-4'>
        <div>
          <Typography variant="h2" color="blue-gray">
            Classroom List
          </Typography>
        </div>

        <div className='flex flex-col sm:flex-row gap-3'>
          <Button
            style={{ backgroundColor: "#8581B8" }}
            onClick={handleOpenModal}
            className="text-normal font-bold flex items-center justify-center py-2 px-4 rounded-lg sm:w-auto w-full"
          >
            Add ClassRoom
          </Button>
          <Button
            style={{ backgroundColor: "#8581B8" }}
            className="text-normal font-bold flex items-center justify-center py-2 px-4 rounded-lg sm:w-auto w-full"
          >
            <FaCloudUploadAlt size={20} className="mr-2" /> Upload Students
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex">
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 ml-3">
          <div onClick={() => setViewMode('grid')} className={`cursor-pointer ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-600'}`}>
            <IoMdGrid className="h-6 w-6" />
          </div>
          <div onClick={() => setViewMode('list')} className={`cursor-pointer ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-600'}`}>
            <FaList className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className='mb-5 flex gap-2'>
        {Array.from({ length: 5 }, (_, i) => 10 - i).map(grade => (
          <Button
            key={grade}
            style={{ backgroundColor: selectedClass === grade ? "#8581B8" : "#E0E0E0" }}
            className="text-normal font-bold"
            onClick={() => setSelectedClass(grade)}
          >
            {grade}th
          </Button>
        ))}
      </div>

      {viewMode === 'grid' ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[400px] overflow-y-auto'>
          {classrooms.map((room, index) => (
            <div key={index} className="mb-5" onClick={() => handleCardClick(room.id)}>
              <Card className="bg-gradient-to-r from-blue-400 to-purple-500">
                <div className="w-full bg-white pt-4 pb-4 rounded-b-lg flex flex-col items-center">
                  <div className='bg-light-blue-900 w-20 h-20 rounded-lg flex items-center justify-center mb-3 cursor-pointer'>
                    <Typography className='text-center' color='white' variant="h6">{room.name} {room.division}</Typography>
                  </div>
                  <Typography variant="h5">Students: {room.students.length}</Typography>
                  <Typography variant="h6">Total seat: {room.capacity}</Typography>
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className='max-h-[400px] overflow-y-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50 sticky top-0'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-bold uppercase tracking-wider'>Name</th>
                <th className='px-6 py-3 text-left text-xs font-bold uppercase tracking-wider'>Division</th>
                <th className='px-6 py-3 text-left text-xs font-bold uppercase tracking-wider'>Students</th>
                <th className='px-6 py-3 text-left text-xs font-bold uppercase tracking-wider'>Total seat</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {classrooms.map((room, index) => (
                <tr key={index} onClick={() => handleCardClick(room.id)} className='cursor-pointer hover:bg-gray-100'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{room.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{room.division}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{room.students.length}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{room.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddClassRoom isOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
}

export default ClassRooms;
