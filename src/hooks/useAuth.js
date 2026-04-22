import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../API";

const useAuth = () => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [isVerifying, setIsVerifying] = useState(true);
    const [lockTimeout, setLockTimeout] = useState("off");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/SignIn");
                return;
            }
            try {
                if (!location.state?.fromConfirmPin) {
                    const lockRes = await axios.get(`${API_BASE_URL}lock/preferences`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (lockRes.data?.preferences) {
                        setLockTimeout(lockRes.data.preferences);
                    }
                }

                const profileRes = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(profileRes.data.full_name || "Guest");
                setProfilePic(profileRes.data.profile_picture || null);
                setIsVerifying(false);

            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 423) {
                    navigate("/ConfirmPin");
                    return;
                }
                setIsVerifying(false);
            }
        };

        initAuth();
    }, [navigate]);

    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (document.visibilityState === "visible") {
                setIsVerifying(true);
                const token = localStorage.getItem('token');
                if (!token) return;

                try {
                    await axios.get(`${API_BASE_URL}profiles/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setIsVerifying(false);
                } catch (err) {
                    if (err.response?.status === 401 || err.response?.status === 423) {
                        navigate("/ConfirmPin");
                    }
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, [navigate]);

    useEffect(() => {
        if (isVerifying) return;

        const sendHeartbeat = async () => {
            if (document.visibilityState !== "visible") return;

            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (err) {
                if (err.response?.status === 401 || err.response?.status === 423) {
                    navigate("/ConfirmPin");
                }
            }
        };

        const interval = setInterval(sendHeartbeat, 30000);
        return () => clearInterval(interval);
    }, [isVerifying, navigate]);

    return { name, profilePic, isVerifying, lockTimeout };
};

export default useAuth;