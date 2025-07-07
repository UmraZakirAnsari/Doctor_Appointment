import jwt from 'jsonwebtoken'

// Doctor authentication middleware
const authdoctor = async (req, res, next) => {
  try {
    const token =
      req.headers.dtoken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.doctorId = decoded.id;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authdoctor;
