import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectTeachers } from '../../../Redux/Slices/FetchAllTeacherSlice';
import { fetchAllTeachers } from '../../../Redux/Actions/Action';
import { Button, Card, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

const TeachersListView = ({ onOpenModal, isModal }) => {

  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);

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
        <Button onClick={onOpenModal} style={{ backgroundColor: "#8581B8" }} className=" text-white font-bold">
          Add New Teacher
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {teachers.map((user, index) => (
          <div key={index} className="mb-2">
            <Card className="w-full p-0 overflow-hidden" >
              <div className="relative flex flex-col items-center">
                <div className="w-full h-32 bg-gray-200 flex justify-center items-end rounded-t-lg">
                  <img
                    onClick={() => isModal(user.id)}
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

    </div>
  )
}

export default TeachersListView