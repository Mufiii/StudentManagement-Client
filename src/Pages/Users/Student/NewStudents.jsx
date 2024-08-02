import axios from 'axios'
import React from 'react'

const NewStudents = () => {

  const NewStudentView = async (e)=> {

    const response = await axios.post({
        url:`${import.meta.env.VITE_URL_SERVER}/admins/student/`, 
    })
  }

  return (
    <div>



    </div>
  )
}

export default NewStudents