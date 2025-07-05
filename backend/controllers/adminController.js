import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

//api for adding doctor 
const addDoctor=async (req,res) => {
     try {
          
          
        const{name,email,password,speciality,degree,experience,about,fees,address}=req.body
        const imageFile=req.file   
        //checking for all data to add  doctor
        if(!name||!email||!password||!speciality||!degree||!experience||!about||!fees||!address){
            return res.json({success:false,message:"Missing Details"})
        }

        //validating email format
        if(!validator.isEmail(email)){
             return res.json({success:false,message:"Please Enter a valid Email"}) 

        }
        //validating strong password
        if(password.length<8){
             return res.json({success:false,message:"Please Enter strong password"})
        }
        //hasing doctor password

        const salt=await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)

        //upload image to cloudinary
        const imageUpload=await cloudinary.uploader.upload(imageFile.path,{ resource_type:"image"})
        const imageURL=imageUpload.secure_url

        const doctorData={   
               name,email,
               image:imageURL,
               password:hashedPassword,
               speciality,
               degree,
               experience,
               about,
               fees,
               address:JSON.parse(address),
               date:Date.now()
        }
    const newDoctor =new doctorModel(doctorData)
    await newDoctor.save()
    res.json({success:true,message:"Doctor Added"})
     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }
}
// API for Admin Login
const loginAdmin= async (req,res) => {
     try {
          const {email,password}=req.body
          if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
                   const token=jwt.sign(email+password,process.env.JWT_SECRET)
                   res.json({success:true,token})
          } else{
               res.json({success:false,message:"Invalid Credentials"})
          }
     } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
     }
}
// API to get all doctor list  for admin panel 
     const allDoctors=async (req,res) => {
          try {
               const doctors=await doctorModel.find({}).select('-password')
               res.json({success:true,doctors})
               
          } catch (error) {
                console.log(error)
                res.json({success:false,message:error.message})
          }   
     }

     //API to get all appoinment list
     const appointmentsAdmin=async (req,res) => {
        try {
          const appointments=await  appointmentModel.find({})
          res.json({success:true,appointments})
        } catch (error) {
           console.log(error)
                res.json({success:false,message:error.message})
          }   
        }  
     //API for appointment cancellation 
     const appointmentCancell = async (req, res) => {
         try {
          
             const { appointmentId } = req.body;
     
     
             const appointment = await appointmentModel.findById(appointmentId);
             if (!appointment) {
                 return res.json({ success: false, message: 'Appointment not found' });
             }
     
     
             
     
             await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
     
     
             const { docId, slotDate, slotTime } = appointment;
             const doctorData = await doctorModel.findById(docId);
     
             if (doctorData?.slots_booked?.[slotDate]) {
                 doctorData.slots_booked[slotDate] = doctorData.slots_booked[slotDate].filter(
                     (t) => t !== slotTime
                 );
     
                 if (doctorData.slots_booked[slotDate].length === 0) {
                     delete doctorData.slots_booked[slotDate];
                 }
     
                 await doctorModel.findByIdAndUpdate(docId, {
                     slots_booked: doctorData.slots_booked,
                 });
             }
     
             return res.json({ success: true, message: 'Appointment cancelled' });
         } catch (error) {
             console.error('Cancel Error:', error);
             return res.json({ success: false, message: error.message });
         }
     };
   //API to get dashboard data for admin panel 
   const adminDashboard=async (req,res) => {
     try {
           const doctors =await doctorModel.find({})
           const users= await userModel.find({})
           const appointment=await appointmentModel.find({})
           const dashData={
               doctors:doctors.length,
               appointment:appointment.length,
               patients:users.length,
               latestAppointments:appointment.reverse().slice(0,5)

           }
           res.json({success:true,dashData})



     } catch (error) {
          console.error('Cancel Error:', error);
          return res.json({ success: false, message: error.message });
     }
     
   }
export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancell,adminDashboard} 