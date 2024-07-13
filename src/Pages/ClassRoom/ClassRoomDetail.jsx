import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClassRoomData } from '../../Redux/Actions/Action'
import { Link, useParams } from 'react-router-dom'
import { Button, Card, Typography } from '@material-tailwind/react'


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
              <Typography variant="h4" color="blue-gray">
                Classroom {filteredClassroom.name}
              </Typography>
              <Button style={{ backgroundColor: "#8581B8" }} className="text-white font-bold">
                Add New Student
              </Button>
            </div>
            <div>
              {filteredClassroom.classTeacher ? (
                <Typography variant="h6" color="blue-gray" className="mb-4">
                  Class Teacher: {filteredClassroom.classTeacher.teacher}
                </Typography>
              ) : (
                <Typography variant="h6" color="red" className="mb-4">
                  Class Teacher: No class teacher assigned
                </Typography>
              )}
              {filteredClassroom.students.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">S.No</th>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Admission No</th>
                      <th className="py-2 px-4 border-b">Gender</th>
                      <th className="py-2 px-4 border-b">Guardian Name</th>
                      <th className="py-2 px-4 border-b">Address</th>
                      {/* Add more table headers as needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClassroom.students.map((student, index) => (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{index + 1}</td>
                        <td className="py-2 px-4 border-b">
                          <Link to={`/student/${student.id}`} className="text-blue-500 underline">
                            {student.user.name}
                          </Link>
                        </td>
                        <td className="py-2 px-4 border-b">{student.admission_no}</td>
                        <td className="py-2 px-4 border-b">{student.user.gender}</td>
                        <td className="py-2 px-4 border-b">{student.guardian_name}</td>
                        <td className="py-2 px-4 border-b">{student.address}</td>
                        {/* Add more table cells as needed */}
                      </tr>
                    ))}
                  </tbody>
                </table>
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