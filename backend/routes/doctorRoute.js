
import express from 'express'
import {doctorList,loginDoctor,appointmentsDoctor,appointmentComplete,appointmentCancel,doctorDashboard, doctorProfile,updateDoctorProfile} from '../controllers/doctorController.js'
import authdoctor from '../middlewares/authdoctor.js'

const doctorRouter= express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/appointments',authdoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authdoctor,appointmentComplete)
doctorRouter.post('/cancel-appointment',authdoctor,appointmentCancel)
doctorRouter.get('/dashboard',authdoctor,doctorDashboard)
doctorRouter.get('/profile',authdoctor,doctorProfile)
doctorRouter.post('/update-profile',authdoctor,updateDoctorProfile)


export default doctorRouter 