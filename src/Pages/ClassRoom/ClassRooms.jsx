import { Button, Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectClassRooms } from '../../Redux/Slices/FetchAllClassroomSlice';
import { fetchAllClassRooms } from '../../Redux/Actions/Action';
import { FaSearch } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";

const ClassRooms = () => {
  const [selectedClass, setSelectedClass] = useState(10);
  const navigate = useNavigate();

  const handleCardClick = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  const dispatch = useDispatch();
  const classrooms = useSelector(selectClassRooms);

  useEffect(() => {
    dispatch(fetchAllClassRooms(selectedClass));
  }, [dispatch, selectedClass]);


  return (
    <div>
      <div className='flex justify-between mb-4'>
        <div>
          <Typography variant="h2" color="blue-gray">
            Classroom List
          </Typography>
        </div>
        <div className='flex gap-3'>
          <Button style={{ backgroundColor: "#8581B8" }} className="text-normal font-bold">
            Add ClassRoom
          </Button>
          <Button style={{ backgroundColor: "#8581B8" }} className="text-normal font-bold flex">
            <FaCloudUploadAlt size={20} /> Upload Students
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex ">
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-gray-900 border border-gray-300 rounded-lg py-2 px-4 block w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-3 ml-3">
          <div>
            <IoMdGrid className="text-gray-600 h-6 w-6 cursor-pointer hover:text-blue-500" />
          </div>
          <div>
            <FaList className="text-gray-600 h-6 w-6 cursor-pointer hover:text-blue-500" />
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
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 '>
        {classrooms.map((room, index) => (
          <div key={index} className="mb-5 " onClick={() => handleCardClick(room.id)}>
            <Card className="bg-gradient-to-r from-blue-400 to-purple-500">
              <div className="w-full bg-white pt-4 pb-4 rounded-b-lg flex flex-col items-center">
                <div className='bg-light-blue-900 w-20 h-20 rounded-lg flex items-center justify-center mb-3'>
                  <Typography className='text-center' color='white' variant="h6">{room.name} {room.division}</Typography>
                </div>
                <Typography variant="h5">Students: {room.students.length}</Typography>
                <Typography variant="h6">Total seat: {room.capacity}</Typography>
                {/* {room.classTeacher && (
                  <Typography variant="subtitle2">Teacher: {room.classTeacher.name}</Typography>
                )} */}
              </div>
            </Card>
          </div>
        ))}
      </div>

    </div>
  );
}

export default ClassRooms;
