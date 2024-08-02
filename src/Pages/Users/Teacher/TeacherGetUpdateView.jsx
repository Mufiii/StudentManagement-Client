import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpeceficTeacherData } from '../../../Redux/Actions/Action';
import { selectSpeceficTeacher } from '../../../Redux/Slices/FetchSpeceficTeacherSlice.jsx';
import { ImCross } from "react-icons/im";


const TeacherGetUpdateView = () => {

  const dispatch = useDispatch();
  const teacher = useSelector(selectSpeceficTeacher);
  const { teacherId } = useParams()


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
      {teacher ? (
        <div className="relative w-full">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <ImCross />
          </button>
          <div className="mb-2 w-full">
            <div className="relative flex flex-col items-center">
              <div className="w-full h-40 bg-gray-200 flex items-end rounded-t-lg">
                <img
                  src={teacher.photo || "https://imgs.search.brave.com/kZ8uNg3_DmqiE02esopfMv83AmRmfgGapmS9SJ86XFQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NTEwNTI4Ny9waG90/by9idWRhcGVzdC1o/dW5nYXJ5LWNyaXN0/aWFuby1yb25hbGRv/LW9mLXBvcnR1Z2Fs/LWNlbGVicmF0ZXMt/YWZ0ZXItc2Nvcmlu/Zy10aGVpci1zaWRl/cy1maXJzdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Smtl/eEpNTU5MZVFndk0x/YmVfQmhtTTNXV3Vq/Nnhrd3Jvc1JrU3da/c1Rvbz0"}
                  className="w-56 h-56 ml-10 -mb-28 rounded-full z-10 border-4 border-white"
                />
                <div className="absolute mb-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Typography className="text-center uppercase" variant="h2">
                    {teacher.user.name}
                  </Typography>
                </div>
              </div>
              <div className="w-full bg-white pt-16 pb-6 rounded-b-lg flex flex-col items-center">
                <Typography className="font-bold mb-4">Email Address: {teacher.user.email}</Typography>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Typography className="font-bold">Permenent Number: {teacher.pen_no}</Typography>
                    <Typography className="font-bold">Username: {teacher.user.username}</Typography>
                    <Typography className="font-bold">Gender: {teacher.user.gender}</Typography>
                    <Typography className="font-bold">Phone: {teacher.user.phone}</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Typography>No data available</Typography>
      )}
    </div>
  );
}

export default TeacherGetUpdateView;
