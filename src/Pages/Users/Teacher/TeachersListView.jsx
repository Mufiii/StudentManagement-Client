import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachers } from '../../../Redux/Slices/FetchAllTeacherSlice';
import { fetchAllTeachers } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import TeacherPostView from './TeacherPostView';
import TeacherGetUpdateView from './TeacherGetUpdateView';

const TeachersListView = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewModal = (id) => {
    setSelectedTeacherId(id);
    setIsOpenModal(true);
  };

  const handleCloseViewModal = () => {
    setIsOpenModal(false);
    setSelectedTeacherId(null);
  };

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch(fetchAllTeachers())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  return (
    <div>
      <div className='flex justify-between'>
        <Typography variant="h4" color="blue-gray">
          Teachers List
        </Typography>
        <Button onClick={handleOpenModal} style={{ backgroundColor: "#8581B8" }} className=" text-white font-bold">
          Add New Teacher
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {teachers.map((user, index) => (
          <div key={index} className="mb-2">
            <Card className="w-full p-0 overflow-hidden" onClick={() => handleViewModal(user.id)}>
              <div className="relative flex flex-col items-center">
                <div className="w-full h-32 bg-gray-200 flex justify-center items-end rounded-t-lg">
                  <img
                    src="https://imgs.search.brave.com/g7dKezKWVTxg4bO0zAStpbkT-dim0uK3tjt7i0NWjPI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ueXBv/c3QuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9zaXRlcy8yLzIw/MjQvMDcvcm9uYWxk/by1ldXJvLmpwZz93/PTEwMjQ"
                    alt={user.user.name}
                    className="w-32 h-32 rounded-full -mb-12 z-10 border-4 border-white"
                  />
                </div>
                <div className="w-full bg-white pt-16 pb-6 rounded-b-lg flex flex-col items-center">
                  <Typography>{user.user.name}</Typography>
                  <Typography>{user.user.email}</Typography>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <TeacherPostView isOpen={isModalOpen} handleClose={handleCloseModal} />
      <TeacherGetUpdateView isOpen={isOpenModal} handleClose={handleCloseViewModal} teacherId={selectedTeacherId} />
    </div>
  );
}

export default TeachersListView;
