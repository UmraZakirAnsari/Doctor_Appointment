import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
const changeAvailability = async (req, res) => {

     try {

          const { docId } = req.body
          const docdata = await doctorModel.findById(docId)
          await doctorModel.findByIdAndUpdate(docId, { available: !docdata.available })
          res.json({ success: true, message: "Availability changed" })

     } catch (error) {
          console.log(error)
          res.json({ success: false, message: error.message })
     }

}
const doctorList = async (req, res) => {
     try {
          const doctors = await doctorModel.find({}).select(['-password', '-email'])
          res.json({ success: true, doctors })
     } catch (error) {
          console.log(error)
          res.json({ success: false, message: error.message })
     }

}
//API for Doctor Login
const loginDoctor = async (req, res) => {
     try {
          const { email, password } = req.body
          console.log("req.body is:", req.body);

          const doctor = await doctorModel.findOne({ email })
          if (!doctor) {
               return res.json({ success: false, message: "Invalid credentials" })
          }
          console.log("Entered:", password);
          console.log("Hashed  :", doctor.password);
          const isMatch = await bcrypt.compare(password, doctor.password);
          console.log("isMatch :", isMatch);

          if (isMatch) {
               const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
               res.json({ success: true, token })
          } else {
               res.json({ success: false, message: "Invalid credentials" })
          }
     } catch (error) {
          console.log(error)
          res.json({ success: false, message: error.message })
     }

};

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
     try {
          const docId = req.doctorId;
          ;

          const appointments = await appointmentModel.find({ docId });

          res.json({ success: true, appointments });
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
     }
};
//API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
     try {
          const appointmentId = req.body.appointmentId;
          const docId = req.doctorId; // ✅ extracted from middleware
          const appointmentData = await appointmentModel.findById(appointmentId);
          if (appointmentData && appointmentData.docId.toString() === docId) {
               await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
               return res.json({ success: true, message: 'Appointment Completed' })
          } else {
               return res.json({ success: false, message: 'Mark Failed' })
          }
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
     }
}

// API to cancel Appointment for doctor panel 
const appointmentCancel = async (req, res) => {
     try {
          const appointmentId = req.body.appointmentId;
          const docId = req.doctorId;

          const appointmentData = await appointmentModel.findById(appointmentId);
          if (appointmentData && appointmentData.docId.toString() === docId) {
               await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
               return res.json({ success: true, message: 'Appointment Cancelled' });
          } else {
               return res.json({ success: false, message: 'Cancellation Failed' });
          }
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
     }
};
// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
     try {
          const docId = req.doctorId;

          if (!docId) {
               return res.status(400).json({ success: false, message: "Doctor ID missing" });
          }

          const appointments = await appointmentModel.find({ docId });

          let earnings = 0;
          let patients = [];

          appointments.map((item) => {
               if (item.isCompleted || item.payment) {
                    earnings += item.amount;
               }
          });

          appointments.map((item) => {
               if (!patients.includes(item.userId.toString())) {
                    patients.push(item.userId.toString());
               }
          });

          const dashData = {
               earnings,
               appointments: appointments.length,
               patients: patients.length,
               latestAppointments: [...appointments].reverse().slice(0, 5),
          };

          res.json({ success: true, dashData });
     } catch (error) {
          console.log("doctorDashboard error:", error);
          res.status(500).json({ success: false, message: error.message });
     }
};
//API to get profile for Doctor Panel 
// controllers/doctorController.js
// controllers/doctorController.js
const doctorProfile = async (req, res) => {
  try {
    const docId = req.doctorId;                 // ✅ take it from middleware
    if (!docId) {
      return res.status(400).json({ success: false, message: "Doctor ID missing" });
    }

    const profileData = await doctorModel
      .findById(docId)
      .select("-password -email");              

    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//API to update doctor profile data from doctorPanel

const updateDoctorProfile = async (req, res) => {
  try {
    const { fees, address, available } = req.body;
    const docId = req.doctorId; 

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });
    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard ,doctorProfile,updateDoctorProfile}