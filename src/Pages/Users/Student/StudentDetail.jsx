import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchStudentData } from '../../../Redux/Actions/Action'
import { selectStudent } from '../../../Redux/Slices/StudentDataSlice'
import { Typography } from '@material-tailwind/react'

const StudentDetail = () => {

  const {studentId} = useParams()
  const dispatch = useDispatch()
  const student = useSelector(selectStudent);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentData(studentId));
    }
  }, [dispatch, studentId]);


  
  return (
    <div>
        <div>
      {student ? (
        <div>
          <Typography variant='h3'>Name: {student.user.name}</Typography>
          <Typography variant='h3'>Username: {student.user.username}</Typography>
          {/* Add other student details here */}
        </div>
      ) : (
        <p>No student data available</p>
      )}
    </div>
    </div>
  )
}

export default StudentDetail