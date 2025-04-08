import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import LoginBgImg from "../../images/Global_bg.avif";
import { api } from '../../api';

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
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

        try {
            const response = await axios.post(`${api}/auth/login`, logindata);

            toast.success("Login Successful!");

            const { token, user } = response.data;
            

            console.log("The JWT token is: ", token);
            console.log("The user data is: ", user);

            // Store the token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            localStorage.setItem('email', user.email);

            // Redirect based on the role
            setTimeout(() => {
                switch (user.role) {
                    case "Admin":
                        navigate('/admindashboard');
                        break;
                    case "user":
                        navigate('/userdashboard')
                        break;
                    default:
                        break;
                }
            }, 1500)

        } catch (error) {
            // Temporarily change background opacity on error
            toast.error("Login Failed. Invalid credentials!");
            console.error(error);
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
                                    Log In
                                </button>
                            </div>
                            <p className="font-normal text-gray-600 flex justify-center items-center mt-1">Don't have and account yet?
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
