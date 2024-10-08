import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachers } from '../../../Redux/Slices/FetchAllTeacherSlice';
import { fetchAllTeachers } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import TeacherPostView from './TeacherPostView';
import { useNavigate } from 'react-router-dom';


const TeachersListView = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = (teacherId) => {
    navigate(`/teacher/${teacherId}`);
  };

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch(fetchAllTeachers())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div className='h-[555px] overflow-y-auto hide-scrollbar '>
      <div className='flex justify-between p-4 bg sticky top-0 z-20  '>
        <Typography variant="h4" color="blue-gray">
          Teachers List
        </Typography>
        <Button
          onClick={handleOpenModal}
          style={{ backgroundColor: "#8581B8" }}
          className="text-white font-bold"
        >
          Add New Teacher
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {teachers.map((user, index) => (
          <div key={index} className="mb-2">
            <Card className="w-full p-0 overflow-hidden" onClick={() => handleCardClick(user.id)}>
              <div className="relative flex flex-col items-center">
                <div className="w-full h-32 bg-gray-200 flex justify-center items-end rounded-t-lg">
                  <img
                    src={user.photo}
                    alt={user.user.name}
                    className="w-32 h-32 rounded-full -mb-12 z-10 border-4 border-white cursor-pointer"
                  />
                </div>
                <div className="w-full bg-white pt-16 pb-6 rounded-b-lg flex flex-col items-center">
                  <Typography className='font-bold'>{user.user.name}</Typography>
                  <Typography>{user.user.email}</Typography>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <TeacherPostView isOpen={isModalOpen} handleClose={handleCloseModal} />
    </div>
  );
};

export default TeachersListView;
