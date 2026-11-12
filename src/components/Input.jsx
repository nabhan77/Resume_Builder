import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import jobTitle from '../assets/jobRole.json'
import skills from '../assets/jobSkills.json'
import jobsummary from '../assets/summaries.json'
import { addResumeAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';


const steps = ['Basic Informations', 'Contact Details', 'Education Details', 'Review & Submit'];


function Input({resumeData,setResume}) {

  console.log(resumeData);


  const [activeStep, setActiveStep] = React.useState(0);
  const navigate=useNavigate()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const previousActiveStepRef = React.useRef(activeStep);
  const resetButtonRef = React.useRef(null);
  const nextButtonRef = React.useRef(null);
  const renderStepContent = (stepcount) => {
    switch (stepcount) {
      case 0: return (
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
      )
      case 1: return (
        <div>
          <h3>Contact Details</h3>
          <TextField value={resumeData.email} onChange={(e) => setResume({ ...resumeData, email: e.target.value })} id="standard-basic" className='w-100' label="Email" variant="standard" />

          <TextField value={resumeData.phone} onChange={(e) => setResume({ ...resumeData, phone: e.target.value })} id="standard-basic" className='w-100' label="Phone" variant="standard" />
          <TextField value={resumeData.github} onChange={(e) => setResume({ ...resumeData, github: e.target.value })} id="standard-basic" className='w-100' label="GitHub" variant="standard" />
          <TextField value={resumeData.linkedin} onChange={(e) => setResume({ ...resumeData, linkedin: e.target.value })} id="standard-basic" className='w-100' label="LinkedIn" variant="standard" />

        </div>
      )
      case 2: return (
        <div>
          <h3>Educational Details</h3>
          <TextField value={resumeData.course} onChange={(e) => setResume({ ...resumeData, course: e.target.value })} id="standard-basic" className='w-100' label="Course Name" variant="standard" />

          <TextField value={resumeData.university} onChange={(e) => setResume({ ...resumeData, university: e.target.value })} id="standard-basic" className='w-100' label="College/University " variant="standard" />
          <TextField value={resumeData.passout} onChange={(e) => setResume({ ...resumeData, passout: e.target.value })} id="standard-basic" className='w-100' label="Passout Year" variant="standard" />
        </div>
      )
      case 3: return (
        <div>
          <h3>Skills</h3>
          <p>Our AI will generate skills & summary according to your job role.Click the <span className='fw-bold'>
            AI SKILL & SUMMARY </span>button to proceed</p>
        </div>
      )
    }
  }

  const generateSkillsum = () => {
    setResume({ ...resumeData, skills: skills[resumeData.jobTitle], summary: jobsummary[resumeData.jobTitle] })

    handleNext()
  }
  const addResume = async () => {
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
      const res = await addResumeAPI(resumeData)
      console.log(res);
      if (res.status == 201) {
        alert("resume generated successfully")
        navigate(`/view/${res.data.id}`)
      }

    }
    else {
      alert("Fill the field completely")
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={addResume} ref={resetButtonRef}>
              FInish
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          {/*view of each step*/}
          <Box>

            {renderStepContent(activeStep)}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            {
              activeStep === steps.length - 1 ?
                <button className='btn btn-primary' onClick={generateSkillsum}>Generate Skills & Summary</button>
                :
                <button className='btn btn-dark' onClick={handleNext}>Next</button>
            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  )
}

export default Input