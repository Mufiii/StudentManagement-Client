import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassRoomData } from '../../Redux/Actions/Action'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Typography } from '@material-tailwind/react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { selectClassRoomsData } from '../../Redux/Slices/fetchClassRoomDataSlice'
import NewStudents from '../Users/Student/NewStudents'

const ClassRoomDetail = () => {

  const { classroomId } = useParams()
  const dispatch = useDispatch()
  const classrooms = useSelector(selectClassRoomsData);
  const [isOpenModal,setOpenModal] = useState(false)
  useEffect(() => {
    
    dispatch(fetchClassRoomData(classroomId))
      .then((result) => console.log("Fetch success in roomData:", result))
      .catch((err) => console.error("Fetch error in roomData:", err));
  }, []);

  const handleOpenModal = () => {
      setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }


  return (
    <div>
      <div>
        {classrooms && (
          <div key={classrooms.id}>
            <div className='flex justify-between mb-4'>
              <Typography variant="h2" color="blue-gray">
                Classroom {classrooms.name}{classrooms.division}
              </Typography>
              <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold" onClick={handleOpenModal}>
                Add New Student
              </Button>
            </div>
            <div>
              {classrooms.classTeacher ? (
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Class Teacher: {classrooms.classTeacher.teacher}
                </Typography>
              ) : (
                <Typography variant="h6" color="red" className="mb-4">
                  Class Teacher: No class teacher assigned
                </Typography>
              )}
              {classrooms && classrooms.students && classrooms.students.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">S.No</TableCell>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">Name</TableCell>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">Admission No</TableCell>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">Gender</TableCell>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">Guardian Name</TableCell>
                      <TableCell style={{ fontWeight: 900 }} className="py-2 px-4 border-b">Address</TableCell>
                      {/* Add more table headers as needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classrooms.students.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell className="py-2 px-4 border-b">{index + 1}</TableCell>
                        <TableCell className="py-2 px-4 border-b">
                          <Link to={`/student/${student.id}`} className="text-blue-500 underline">
                            {student.user.name}
                          </Link>
                        </TableCell>
                        <TableCell className="py-2 px-4 border-b">{student.admission_no}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{student.user.gender}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{student.guardian_name}</TableCell>
                        <TableCell className="py-2 px-4 border-b">{student.address}</TableCell>
                        {/* Add more table cells as needed */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="h3" color="red" className="text-center mt-4">
                  No students found
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>
      <NewStudents
        isOpen={isOpenModal}
        handleClose={handleCloseModal}
      />
    </div>
  )
}

export default ClassRoomDetail