import doctorModel from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
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
}
export { changeAvailability, doctorList, loginDoctor }