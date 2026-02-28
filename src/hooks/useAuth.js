// hooks/useAuth.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../API";

const useAuth = () => {
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [isVerifying, setIsVerifying] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/SignIn");
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setName(response.data.full_name || "Guest");
                setProfilePic(response.data.profile_picture || null);
                setIsVerifying(false);   // ✅ Success

            } catch (err) {
                if (err.response?.status === 401) {
                    navigate("/ConfirmPin");
                    return;
                }
                // ✅ YE WALA FIX — network/server error pe logout MAT karo
                // sirf verifying band karo
                setIsVerifying(false);
                // localStorage.removeItem("token");  ← YE HATA DO
                // navigate("/SignIn");               ← YE HATA DO
            }
        };
        fetchProfile();
    }, [navigate]);

    return { name, profilePic, isVerifying };
};

export default useAuth;