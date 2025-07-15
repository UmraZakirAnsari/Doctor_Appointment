import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  /* ---------- constants ---------- */
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  /* ---------- state ---------- */
  const [doctors, setDoctors]   = useState([]);
  const [token, setToken]       = useState(localStorage.getItem("token") || false);
  const [userdata, setUserData] = useState(false);

  /* ---------- helpers ---------- */
  const invalidateSession = (msg) => {
    toast.error(msg);
    setToken(false);
    setUserData(false);
    localStorage.removeItem("token");
  };

  /* ---------- API calls ---------- */
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`, {
        headers: { token },
      });
      if (data.success) setDoctors(data.doctors);
      else              toast.error(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) setUserData(data.userdata);
      else              invalidateSession(data.message);
    } catch (err) {
      console.error(err);
      invalidateSession("Session expired. Please login again.");
    }
  };

  /* ---------- effects ---------- */
  useEffect(() => {
    getDoctorsData();          // doctors list ek hi baar lao
  }, []);

  useEffect(() => {
    if (token) loadUserProfileData();
    else       setUserData(false);
  }, [token]);

  /* ---------- context value ---------- */
  const value = {
    /* globals */
    currencySymbol,
    backendUrl,

    /* auth */
    token,
    setToken,
    userdata,
    setUserData,
    logout: () => invalidateSession("Logged out"),

    /* data */
    doctors,
    getDoctorsData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
