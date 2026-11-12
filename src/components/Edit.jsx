import React, { useRef } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from 'react-icons/fa';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FaXmark } from 'react-icons/fa6';
import { updateResumeAPI } from '../services/allAPI';
import jobTitle from '../assets/jobRole.json'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90vh',
  overflowY: 'auto'
};

function Edit({ resumeData, setResume }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const skillRef = useRef()

  const addSkills = (skill) => {
    if (skill) {
      if (resumeData?.skills.find(sk => sk.toLowerCase() == skill.toLowerCase())) {
        alert("Skill already added... Please add another one")
      }
      else {
        setResume({ ...resumeData, skills: [...resumeData.skills, skill] })
        skillRef.current.value = ""
      }
    }
    else{
      alert("Enter a valid skill")
    }
  }
  const removeSkills = (skill) => {
    setResume({ ...resumeData, skills: resumeData.skills?.filter(sk => sk != skill) })
  }
  const update = async () => {
    const { name,
      jobTitle,
      location,
      email,
      phone,
      github,
      linkedin,
      course,
      university,
      passout,
      skills,
      summary } = resumeData
    if (name && jobTitle && location && email && phone && github && linkedin && course && university && passout && skills.length > 0 && summary) {
      const res = await updateResumeAPI(resumeData?.id,resumeData)
      console.log(res);
      if (res.status == 200) {
        alert("resume Updated successfully")
        handleClose()
        navigate(`/view/${res.data.id}`)
      }

    }
    else {
      alert("Fill the field completely")
    }
  }

  return (
    <>
      <button onClick={handleOpen} className='btn text-warning'><FaEdit className='fs-1' /></button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Details
          </Typography>

          <div>
            <h3>Personal Details</h3>
            <TextField value={resumeData.name} onChange={(e) => setResume({ ...resumeData, name: e.target.value })} id="standard-basic" className='w-100' label="Full Name" variant="standard" />
            <FormControl variant="standard" className='w-100'>
              <InputLabel id="demo-simple-select-standard-label">Job Title</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={resumeData.jobTitle} onChange={(e) => setResume({ ...resumeData, jobTitle: e.target.value })}
              >

                {
                  jobTitle.jobRoles.map(job => (
                    <MenuItem value={job}>{job}</MenuItem>
                  ))
                }

              </Select>
            </FormControl>

            <TextField value={resumeData.location} onChange={(e) => setResume({ ...resumeData, location: e.target.value })} id="standard-basic" className='w-100' label="Location" variant="standard" />

          </div>

          <div>
            <h3>Contact Details</h3>
            <TextField value={resumeData.email} onChange={(e) => setResume({ ...resumeData, email: e.target.value })} id="standard-basic" className='w-100' label="Email" variant="standard" />

            <TextField value={resumeData.phone} onChange={(e) => setResume({ ...resumeData, phone: e.target.value })} id="standard-basic" className='w-100' label="Phone" variant="standard" />
            <TextField value={resumeData.github} onChange={(e) => setResume({ ...resumeData, github: e.target.value })} id="standard-basic" className='w-100' label="GitHub" variant="standard" />
            <TextField value={resumeData.linkedin} onChange={(e) => setResume({ ...resumeData, linkedin: e.target.value })} id="standard-basic" className='w-100' label="LinkedIn" variant="standard" />

          </div>

          <div>
            <h3>Educational Details</h3>
            <TextField value={resumeData.course} onChange={(e) => setResume({ ...resumeData, course: e.target.value })} id="standard-basic" className='w-100' label="Course Name" variant="standard" />

            <TextField value={resumeData.university} onChange={(e) => setResume({ ...resumeData, university: e.target.value })} id="standard-basic" className='w-100' label="College/University " variant="standard" />
            <TextField value={resumeData.passout} onChange={(e) => setResume({ ...resumeData, passout: e.target.value })} id="standard-basic" className='w-100' label="Passout Year" variant="standard" />
          </div>

          <div className='mt-4'>
            <h3>Skills</h3>
            <div className='d-flex align-items-center justify-content-center'>
              <input ref={skillRef} type="text" className='form-control' placeholder='enter skill' />
              <button onClick={() => addSkills(skillRef.current.value)} className='btn btn-primary ms-3'>ADD</button>

            </div>

            <h5 className='mt-3'>Added Skills</h5>
            <div className='d-flex flex-wrap'>
              {
                resumeData?.skills?.map(sk => (
                  <button className='btn btn-dark m-1' onClick={()=>removeSkills(sk)}>{sk} <FaXmark /></button>

                ))
              }
            </div>

          </div>

          <div className='mt-3'>
            <h3>Professional Summary</h3>
            <TextField value={resumeData?.summary} onChange={(e)=>setResume({...resumeData,summary:e.target.value})} id="standard-basic" className='w-100' label="Summary" variant="standard" multiline />
          </div>

          <button className='btn btn-primary my-3 w-100' onClick={update}>UPDATE</button>


        </Box>
      </Modal>
    </>
  )
}

export default Edit