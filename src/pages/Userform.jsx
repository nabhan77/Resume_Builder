import React, { useState } from 'react'
import Input from '../components/Input'
import Preview from '../components/Preview'


function Userform() {
  
    const [resumeData, setResume] = useState({
      name: "",
      jobTitle: "",
      location: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      course: "",
      university: "",
      passout: "",
      skills: [],
      summary: ""
  
  
    })

  return (
    <div className='row p-5'>
      <div className="col-md-6">
      <Input resumeData={resumeData} setResume={setResume}/>
      </div>
      <div className="col-md-6">
        {
          resumeData?.name&&
          <Preview resumeData={resumeData}/>
        }
      </div>
    </div>
  )
}

export default Userform