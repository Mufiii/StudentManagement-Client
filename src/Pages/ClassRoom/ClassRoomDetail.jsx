import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassRoomData } from '../../Redux/Actions/Action'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Typography } from '@material-tailwind/react'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const ClassRoomDetail = () => {

  const { classroomId } = useParams()
  const dispatch = useDispatch()
  const classrooms = useSelector(state => state.classrooms.classrooms);

  useEffect(() => {
    if (!classrooms.length) {
      dispatch(fetchClassRoomData(classroomId))
        .then((result) => console.log("Fetch success in roomData:", result))
        .catch((err) => console.error("Fetch error in roomData:", err));
    }
  }, [dispatch, classroomId, classrooms.length]);

  const filteredClassroom = classrooms.find(room => room.id === parseInt(classroomId));
  console.log(filteredClassroom);

  return (
    <div>
      <div>
        {filteredClassroom && (
          <div key={filteredClassroom.id}>
            <div className='flex justify-between mb-4'>
              <Typography variant="h2" color="blue-gray">
                Classroom {filteredClassroom.name}
              </Typography>
              <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold">
                Add New Student
              </Button>
            </div>
            <div>
              {filteredClassroom.classTeacher ? (
                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Class Teacher: {filteredClassroom.classTeacher.teacher}
                </Typography>
              ) : (
                <Typography variant="h6" color="red" className="mb-4">
                  Class Teacher: No class teacher assigned
                </Typography>
              )}
              {filteredClassroom.students.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">S.No</TableCell>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">Name</TableCell>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">Admission No</TableCell>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">Gender</TableCell>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">Guardian Name</TableCell>
                      <TableCell style={{ fontWeight: 900}} className="py-2 px-4 border-b">Address</TableCell>
                      {/* Add more table headers as needed */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredClassroom.students.map((student, index) => (
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
    </div>
  )
}

export default ClassRoomDetail