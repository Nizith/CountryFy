import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import LoginBgImg from "../../images/Global_bg.avif";
import Loading from "../Specials/Loading";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [logindata, setlogindata] = useState({
        email: "",
        password: ""
    });

    const handleLoginChange = (l) => {
        const { name, value } = l.target;
        setlogindata(logindata => ({
            ...logindata,
            [name]: value
        }));
    };

    const SubmitLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === logindata.email && u.password === logindata.password);

            if (!user) {
                toast.error("Invalid credentials!");
                setLoading(false);
                return;
            }

            // Store user data in localStorage
            localStorage.setItem('token', 'dummy-token-' + Date.now()); // Simulate a token
            localStorage.setItem('role', user.role);
            localStorage.setItem('email', user.email);
            localStorage.setItem('id', user.id);
            localStorage.setItem('name', user.name);

            toast.success("Login Successful!");

            // Redirect based on the role
            setTimeout(() => {
                switch (user.role) {
                    case "Admin":
                        navigate('/admin-dashboard');
                        break;
                    case "user":
                        navigate('/user-content')
                        break;
                    default:
                        toast.error("Unauthorized role!");
                        break;
                }
            }, 2000);

        } catch (error) {
            toast.error("Login Failed. Please try again!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Toaster />
            <div className="flex justify-between items-center px-24 w-screen h-screen">
                {/* Background Image */}
                <div>
                    <img
                        src={LoginBgImg}
                        alt="Background"
                        className=""
                    />
                </div>
                {/* Login Form */}
                <div className="w-2/5">
                    <div className="bg-white bg-opacity-30 border-2 border-gray-400 my-auto rounded-3xl p-5">
                        <form className="p-10 mt-3 font-bold" onSubmit={SubmitLogin}>
                            <h1 className="flex justify-center -mt-8 mb-5 text-3xl text-center font-serif">
                                Contry Management Service Portal
                            </h1>
                            <div className="my-10">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 outline-none border-2 border-gray-400 focus:border-[3px] focus:border-blue-600 rounded-lg  ps-5 text-bl2ck font-normal"
                                />
                            </div>
                            <div className="mb-5 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter the Password..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 outline-none border-2 border-gray-400 focus:border-[3px] focus:border-blue-600 rounded-lg  ps-5 text-bl2ck font-normal"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-5 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    {showPassword ? <VscEyeClosed size={25} /> : <VscEye size={25} />}
                                </button>
                            </div>
                            <div className="flex justify-center">
                                <button className="w-full h-12 text-xl mt-5 py-2 px-10 rounded-lg text-white duration-300 bg-indigo-700 hover:ring-1 hover:bg-indigo-600 ring-indigo-700 font-bold font-serif">
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <Loading />
                                        </div>
                                    ) : "Log In"}
                                </button>
                            </div>
                            <p className="font-normal text-gray-600 flex justify-center items-center mt-1">Don't have an account yet?
                                <a href="/create-account" className="text-indigo-600 font-semibold ml-1 hover:underline">Create Account</a>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500">
                    <p>[2025/FEB] Y3S2 - Application Frameworks module project. </p>
                </div>
            </div>
        </>
    );
}
