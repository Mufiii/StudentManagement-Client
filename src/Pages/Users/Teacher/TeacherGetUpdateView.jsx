import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpeceficTeacherData } from '../../../Redux/Actions/Action';
import { selectSpeceficTeacher } from '../../../Redux/Slices/FetchSpeceficTeacherSlice.jsx';
import { ImCross } from "react-icons/im";

const TeacherGetUpdateView = ({ isOpen, handleClose, teacherId }) => {
  
  const dispatch = useDispatch();
  const teacher = useSelector(selectSpeceficTeacher);

  useEffect(() => {
    if (teacherId) {
      console.log(teacherId);
      dispatch(fetchSpeceficTeacherData(teacherId))
        .then((result) => console.log('Fetch success:', result))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [dispatch, teacherId]);

  return (
    <div>
      <Dialog
        size="md"
        open={isOpen}
        handler={handleClose}
        className="bg-transparent shadow-none w-full"
      >
        {teacher ? (
          <div className="relative w-full">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <ImCross />
            </button>
            <div className="mb-2 w-full">
              <div className="relative flex flex-col items-center">
                <div className="w-full h-32 bg-gray-200 flex justify-center items-end rounded-t-lg">
                  <img
                    src={teacher.photo || "https://imgs.search.brave.com/g7dKezKWVTxg4bO0zAStpbkT-dim0uK3tjt7i0NWjPI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ueXBv/c3QuY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9zaXRlcy8yLzIw/MjQvMDcvcm9uYWxk/by1ldXJvLmpwZz93/PTEwMjQ"}
                    alt={teacher.user.name}
                    className="w-32 h-32 rounded-full -mb-12 z-10 border-4 border-white"
                  />
                </div>
                <div className="w-full bg-white pt-16 pb-6 rounded-b-lg flex flex-col items-center">
                  <Typography variant='h3'>{teacher.user.name}</Typography>
                  <Typography className='font-bold mb-4'>{teacher.user.email}</Typography>
                  <div className='flex gap-6'>
                    <Button variant="outlined">
                      <Typography className='font-bold'>{teacher.user.username}</Typography>
                    </Button>
                    <Button variant="outlined">
                      <Typography className='font-bold'>{teacher.user.gender}</Typography>
                    </Button>
                    <Button variant="outlined">
                      <Typography className='font-bold'>{teacher.user.phone}</Typography>
                    </Button>
                  </div>
                  <div className='flex justify-center mt-3'>
                  <Button variant="outlined">
                    <Typography className='font-bold'>{teacher.pen_no}</Typography>
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Typography>No data available</Typography>
        )}
      </Dialog>
    </div>
  );
}

export default TeacherGetUpdateView;
