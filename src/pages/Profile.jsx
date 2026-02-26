import noteviaLogo from "../assets/Neografica.PNG";
import dashboard1 from "../assets/dashboardIcon.PNG";
import journalIcon from "../assets/JournalIcon.PNG";
import penIcon from "../assets/penIcon.PNG";
import profileIcon from "../assets/profileIcon.PNG";
import user from '../assets/user.PNG';
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";

const Profile = () => {
    const API_BASE_URL = 'https://new-my-journals.vercel.app/';
    const navigate = useNavigate();

    // ----- Profile State -----
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [bio, setBio] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewPic, setPreviewPic] = useState(null);
    const [loading, setLoading] = useState(false);

    // ----- Toast State -----
    const [toastMsg, setToastMsg] = useState("");
    const [toastOpen, setToastOpen] = useState(false);

    // ----- Change Password Modal State -----
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);

    const fileInputRef = useRef(null);

    // ----- Show Toast Helper -----
    const showToast = (msg) => {
        setToastMsg(msg);
        setToastOpen(true);
        setTimeout(() => setToastOpen(false), 2500);
    };

    // ----- Fetch Profile on Page Load -----
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) return navigate("/SignIn");

            try {
                const response = await axios.get(`${API_BASE_URL}profiles/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setFullName(response.data.full_name || "");
                setEmail(response.data.email || "");
                setBio(response.data.bio || "");
                setDob(response.data.date_of_birth || "");

                if (response.data.profile_picture) {
                    setPreviewPic(response.data.profile_picture);
                }

            } catch (err) {
                if (err.response?.status === 401) {
                    showToast(err.response?.data?.message || "Please verify your PIN");
                    setTimeout(() => navigate("/ConfirmPin"), 1500);
                    return;
                }
                showToast(err.response?.data?.message || "Something went wrong.");
            }
        };

        fetchProfile();
    }, [navigate]);

    // ----- When user picks a new profile picture -----
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfilePicture(file);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewPic(reader.result);
        reader.readAsDataURL(file);
    };

    // ----- Save Profile Changes -----
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        if (!token) return navigate("/SignIn");

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("full_name", fullName);
            formData.append("date_of_birth", dob);
            formData.append("bio", bio);

            if (profilePicture) {
                formData.append("profile_picture", profilePicture);
            }

            await axios.patch(`${API_BASE_URL}profiles/me`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            showToast("Profile updated successfully!");

        } catch (err) {
            if (err.response?.status === 401) {
                showToast("Session expired. Please login again.");
                setTimeout(() => navigate("/SignIn"), 1500);
                return;
            }
            showToast(err.response?.data?.message || "Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    // ----- Change Password API Call -----
    const handleUpdatePassword = async () => {

        // Step 1: Check all fields are filled
        if (!currentPassword || !newPassword || !confirmPassword) {
            showToast("Please fill in all password fields.");
            return;
        }

        // Step 2: Check new passwords match
        if (newPassword !== confirmPassword) {
            showToast("New password and confirm password do not match.");
            return;
        }

        // Step 3: Basic password strength check before hitting API
        // API requires: uppercase, lowercase, number, special character, min 8 chars
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            showToast("Password must have uppercase, lowercase, number & special character (min 8 chars).");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) return navigate("/SignIn");

        setPasswordLoading(true);

        try {
            // ✅ API expects camelCase: currentPassword and newPassword
            await axios.post(`${API_BASE_URL}auth/change-password`, {
                currentPassword: currentPassword,   // ✅ camelCase - not current_password
                newPassword: newPassword,           // ✅ camelCase - not new_password
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            showToast("Password updated successfully!");

            // Close modal and clear all fields
            setShowPasswordModal(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {
            if (err.response?.status === 401) {
                showToast("Current password is incorrect.");
                return;
            }
            // Show exact error from API if available
            const apiError = err.response?.data?.message || err.response?.data?.error;
            showToast(apiError || "Failed to update password.");
        } finally {
            setPasswordLoading(false);
        }
    };

    // ----- Close Modal and clear fields -----
    const handleCancelModal = () => {
        setShowPasswordModal(false);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    // ----- Logout -----
    const handleLogout = () => {
        localStorage.removeItem("token");
        showToast("Logged out successfully");
        setTimeout(() => navigate("/SignIn"), 1000);
    };

    return (
        <div className="max-w-full min-h-screen bg-[#F4F7FE] flex flex-col md:flex-row">

            {/* Toast Notification */}
            {toastOpen && (
                <Toaster message={toastMsg} visible={toastOpen} onClose={() => setToastOpen(false)} />
            )}

            {/* =============================================
                CHANGE PASSWORD MODAL
            ============================================= */}
            {showPasswordModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b14374d] backdrop-blur-[8px]">

                    {/* Modal Box */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-[500px] mx-4">

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-[#2B3674] text-center mb-6">
                            Change Password
                        </h2>

                        {/* Current Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                placeholder="Enter current password"
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* New Password */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Min 8 chars, uppercase, number, special char"
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter new password"
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleCancelModal}
                                className="flex-1 h-[50px] rounded-full border border-[#E6EDFF] bg-[#F4F7FE] text-[#2B3674] text-sm font-[500] hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdatePassword}
                                disabled={passwordLoading}
                                className="flex-1 h-[50px] rounded-full bg-[#4318FF] text-white text-sm font-[500] hover:bg-[#3311DD] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {passwordLoading ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SIDEBAR ===== */}
            <div className={`w-full md:w-[290px] md:h-screen md:fixed top-0 left-0 bg-white px-[20px] shadow-sm shrink-0 z-50 transition-all duration-300 ${isMenuOpen ? 'h-auto pb-5' : 'h-[80px] overflow-hidden md:h-screen'}`}>

                <div className='flex gap-5 mt-6 md:mt-[55px] mb-5 items-center justify-between md:justify-center w-full h-[45px] rounded-[5px] md:border-b border-[#E6EDFF] md:pb-10'>
                    <div className="flex items-center gap-4 pr-[35px]">
                        <img src={noteviaLogo} alt="" />
                        <h2 className='font-[800] text-[26px] leading-[120%] text-center text-[#1B2559]'>NOTEVIA</h2>
                    </div>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#1B2559]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                <Link to='/Dashboard1' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[16px] w-[16px]' src={dashboard1} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Dashboard</p>
                    </div>
                </Link>

                <Link to='/Journals' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px] w-[17px]' src={journalIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Journals</p>
                    </div>
                </Link>

                <Link to='/AddJournal' className='hover:bg-[#F4F7FE] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={penIcon} alt="" />
                        <p className='text-[#A3AED0] font-[500] text-[16px] leading-[28px]'>Add journal</p>
                    </div>
                </Link>

                <div className='bg-[#4318FF] rounded cursor-pointer h-[45px] w-full flex pl-7 mb-5'>
                    <div className='flex items-center gap-3'>
                        <img className='h-[20px]' src={profileIcon} alt="" />
                        <p className='text-[#FFF] font-[500] text-[16px] leading-[28px]'>Profile</p>
                    </div>
                </div>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="md:ml-[290px] flex-1 p-4 md:p-8 overflow-y-auto">

                <div className="flex justify-between items-center mb-6 sm:mb-8">
                    <div>
                        <p className="text-sm text-[#A3AED0]">Hi {fullName.split(' ')[0] || 'User'},</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#2B3674]">Welcome to Notevia!</h1>
                    </div>
                    <div className="bg-white p-1 rounded">
                        <img
                            src={previewPic || user}
                            alt="Profile"
                            className="border border-[gray] p-1 w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">

                    <div className="flex items-center gap-2 mb-6">
                        <Link to="/Dashboard1" className="text-[#2B3674] hover:text-[#4318FF] transition-colors cursor-pointer">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </Link>
                        <h2 className="text-lg font-semibold text-[#2B3674]">Update Profile</h2>
                    </div>

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-8">
                        <div
                            className="relative w-[70px] h-[70px] rounded-full cursor-pointer group"
                            onClick={() => fileInputRef.current.click()}
                        >
                            {previewPic ? (
                                <img src={previewPic} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-[#4318FF]" />
                            ) : (
                                <div className="w-full h-full rounded-full bg-[#EBE9FB] flex items-center justify-center">
                                    <svg className="w-7 h-7 text-[#4318FF]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                                    </svg>
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                        </div>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
                        <div>
                            <h3 className="text-[#1B2559] font-semibold text-lg">{fullName || "User"}</h3>
                            <p className="text-[#A3AED0] text-sm">Click on photo to change</p>
                        </div>
                    </div>

                    {/* Full Name + Email */}
                    <div className="flex flex-col min-[768px]:flex-row gap-6 mb-6">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Email</label>
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full bg-[#EFEFEF] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#A3AED0] outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Date of Birth</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-[#2B3674] mb-2 pl-[5px]">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            rows={5}
                            placeholder="Tell something about yourself..."
                            className="w-full bg-[#F4F7FE] border border-[#E6EDFF] rounded-xl px-4 py-3 text-sm text-[#2B3674] outline-none focus:border-[#4318FF] transition-colors resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 flex-wrap">
                        <button
                            onClick={handleLogout}
                            className="w-[174px] h-[50px] rounded-full border border-red-300 bg-[#F5E1E7] text-[16px] font-[500] hover:bg-red-50 transition-colors cursor-pointer text-[#FF1818]"
                        >
                            Logout
                        </button>

                        {/* This button opens the modal */}
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="w-[213px] h-[50px] rounded-full border border-[#E6EDFF] text-[#4318FF] text-sm font-[500] hover:bg-[#F4F7FE] transition-colors cursor-pointer bg-[#4318FF1A]"
                        >
                            Change Password
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="w-[174px] h-[50px] rounded-full bg-[#4318FF] text-white text-sm font-[500] hover:bg-[#3311DD] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
