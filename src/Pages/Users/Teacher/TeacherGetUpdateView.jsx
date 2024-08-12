import { Button, Card, Dialog, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpeceficTeacherData } from '../../../Redux/Actions/Action';
import { selectSpeceficTeacher } from '../../../Redux/Slices/FetchSpeceficTeacherSlice.jsx';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import TeacherEditModal from './TeacherEditModal'; 

const TeacherGetUpdateView = () => {
  const dispatch = useDispatch();
  const teacher = useSelector(selectSpeceficTeacher);
  const { teacherId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (teacherId) {
      dispatch(fetchSpeceficTeacherData(teacherId))
        .then((result) => console.log('Fetch success:', result))
        .catch((err) => console.error('Fetch error:', err));
    }
  }, [dispatch, teacherId]);

  const handleDelete = () => {
    console.log('Teacher deleted');
    setShowDeleteModal(false);
  };
  

  return (
    <div className="bg-gray-50 flex justify-center items-center">
      {teacher && teacher.user ? (
        <Card className="w-full max-w-5xl p-8 shadow-lg rounded-lg bg-white">
          <div className="relative mb-8">
            {/* Button container */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-10 hidden md:flex">
              <button
                className="text-blue-600 hover:text-blue-800 text-xl flex items-center justify-center p-2 border border-black rounded-sm bg-white group"
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                  Edit
                </div>
              </button>
              <button
                className="text-red-600 hover:text-red-800 text-xl flex items-center justify-center p-2 border border-black rounded-sm bg-white group"
                onClick={() => setShowDeleteModal(true)}
              >
                <MdDelete />
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1">
                  Delete
                </div>
              </button>
            </div>

            <div className="w-full bg-gradient-to-r bg-blue-gray-50 rounded-t-lg flex justify-center items-end relative py-4">
              <img
                src={teacher.photo || "https://imgs.search.brave.com/kZ8uNg3_DmqiE02esopfMv83AmRmfgGapmS9SJ86XFQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMy/NTEwNTI4Ny9waG90/by9idWRhcGVzdC1o/dW5nYXJ5LWNyaXN0/aWFuby1yb25hbGRv/LW9mLXBvcnR1Z2Fs/LWNlbGVicmF0ZXMt/YWZ0ZXItc2Nvcmlu/Zy10aGVpci1zaWRl/cy1maXJzdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9Smtl/eEpNTU5MZVFndk0x/YmVfQmhtTTNXV3Vq/Nnhrd3Jvc1JrU3da/c1Rvbz0"}
                className="w-32 h-32 -mb-16 rounded-full border-4 border-white"
                alt="Teacher"
              />
            </div>
          </div>
          <div className="text-center mb-6 mt-3">
            <Typography variant="h3" className="font-semibold">
              {teacher.user.name}
            </Typography>
            <Typography variant="subtitle1" className="text-gray-700 mb-4">
              <a href={`mailto:${teacher.user.email}`} className="text-blue-500 hover:underline">{teacher.user.email}</a>
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <Typography variant="body1" className="font-medium text-gray-800">
                  Permanent Number
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-900">
                  {teacher.pen_no}
                </Typography>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <Typography variant="body1" className="font-medium text-gray-800">
                  Username
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-900">
                  {teacher.user.username}
                </Typography>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <Typography variant="body1" className="font-medium text-gray-800">
                  Gender
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-900">
                  {teacher.user.gender}
                </Typography>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
                <Typography variant="body1" className="font-medium text-gray-800">
                  Phone
                </Typography>
                <Typography variant="h6" className="font-semibold text-gray-900">
                  {teacher.user.phone}
                </Typography>
              </div>
            </div>
            <div className="flex md:hidden justify-center space-x-4 mt-4">
              <button
                className="text-blue-600 hover:text-blue-800 text-xl flex items-center justify-center p-2 border border-black rounded-sm bg-white group"
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-600 hover:text-red-800 text-xl flex items-center justify-center p-2 border border-black rounded-sm bg-white group"
                onClick={() => setShowDeleteModal(true)}
              >
                <MdDelete />
              </button>
            </div>
          </div>

          {/* Confirmation Modal */}
          <Dialog
            open={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            size="sm"
            className="flex items-center justify-center"
          >
            <div className="p-6">
              <Typography variant="h6" className="mb-4">Are you sure you want to delete this teacher?</Typography>
              <div className="flex justify-end space-x-4">
                <Button color="red" onClick={handleDelete}>Delete</Button>
                <Button color="gray" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              </div>
            </div>
          </Dialog>

          {/* Edit Modal */}
          <TeacherEditModal
            open={showEditModal}
            onClose={() => setShowEditModal(false)}
            teacher={teacher} // Passss teacher data to  edit modal
          />
        </Card>
      ) : (
        <Typography className="text-center text-gray-500">No data available</Typography>
      )}
    </div>
  );
}

export default TeacherGetUpdateView;
