import { Card, Dialog, Typography } from '@material-tailwind/react';
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import TeachersListView from './TeachersListView';

const TecherGetUpdateView = () => {

  const [userDetails, setUserDetails] = useState(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (id) => {
    console.log("Opening modal for teacher ID:", id);
    setOpen(true);
    fetchUserDetails(id);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const inputRef = useRef()
  const authToken = JSON.parse(localStorage.getItem('authtoken'));
  console.log(authToken, '5555');
  const { id } = useParams()
  console.log(id,'999999999');

  const fetchUserDetails = async (id) => {
    console.log("Fetching details for teacher ID:", id); // Debugging line
    // console.log(e, 'jj');
    // e?.preventDefault()
    // try {
    //   const response = await axios({
    //     method: !e ? 'GET' : 'PUT',
    //     url: `${import.meta.env.VITE_URL_SERVER}/admins/teachers/${teacher_id}/`,
    //     headers:{
    //         'Authorization': `Bearer ${authToken.access}`,
    //         'Content-Type': 'application/json',
    //     },
    //     data:
    //       e ? {
    //         user: {
    //           name: inputRef.current.name.current.value,
    //           username: inputRef.current.username.current.value,
    //           gender: inputRef.current.gender.current.value,
    //           phone: inputRef.current.phone.current.value,
    //           email: inputRef.current.email.current.value,
    //         },
    //         photo: inputRef.current.photo.current.value,
    //       } : null
    //   });
    //   console.log('Response:', response.data);
    //   setUserDetails(response.data);
    // } catch (error) {
    //   console.log(error);
    // }
    // const fetchUserDetails = async (id) => {
      console.log("Fetching details for teacher ID:", id);
      try {
        const response = await axios({
          method: 'GET',
          url: `${import.meta.env.VITE_URL_SERVER}/admins/teachers/${id}/`,
          headers: {
            'Authorization': `Bearer ${authToken.access}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    if (isOpen && id) {
      fetchUserDetails(id);
    }
  }, [isOpen, id]);


  return (
    <div>
      <Dialog
        size="md"
        open={isOpen}
        onClose={handleClose} // Close modal when clicked outside or on close button
        className="bg-transparent shadow-none"
      >
        {userDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            <div className="mb-2">
              <Card className="w-full p-0 overflow-hidden">
                <div className="relative flex flex-col items-center">
                  <div className="w-full h-32 bg-gray-200 flex justify-center items-end rounded-t-lg">
                    <img
                      src={userDetails.user.photo || "https://example.com/default-avatar.jpg"} // Replace with actual photo URL or handle null case
                      alt={userDetails.user.name}
                      className="w-32 h-32 rounded-full -mb-12 z-10 border-4 border-white"
                    />
                  </div>
                  <div className="w-full bg-white pt-16 pb-6 rounded-b-lg flex flex-col items-center">
                    <Typography>{userDetails.user.name}</Typography>
                    <Typography>{userDetails.user.email}</Typography>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </Dialog>
      <TeachersListView isModal={handleOpen} />
    </div>
  )
}

export default TecherGetUpdateView