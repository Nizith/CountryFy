import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import toast, { Toaster } from "react-hot-toast";
import LoginBgImg from "../../images/Signup_bg.avif";
import Loading from "../Specials/Loading";

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [SignupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [passwordMatch, setPasswordMatch] = useState(false);

    const handleLoginChange = (l) => {
        const { name, value } = l.target;
        setSignupData(SignupData => {
            const updatedData = { ...SignupData, [name]: value };

            if (name === "confirmPassword" || name === "password") {
                setPasswordMatch(updatedData.password === updatedData.confirmPassword);
            }

            return updatedData;
        });
    };

    const SubmitRegistation = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!passwordMatch) {
            toast.error("Passwords do not match!");
            setLoading(false);
            return;
        }

        try {
            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const existingUser = users.find(user => user.email === SignupData.email);
            
            if (existingUser) {
                toast.error("Email already exists!");
                setLoading(false);
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now().toString(),
                name: SignupData.name,
                email: SignupData.email,
                password: SignupData.password,
                role: 'user' // Default role
            };

            // Add to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            setTimeout(() => {
                toast.success("Your account created successfully!");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }, 1000);

        } catch (error) {
            toast.error("Signup Failed. Please try again.");
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
                        className="w-[90%]"
                    />
                </div>
                {/* Login Form */}
                <div className="w-2/5">
                    <div className="bg-white bg-opacity-30 border-2 border-gray-400 my-auto rounded-3xl p-5">
                        <form className="p-10 mt-3 font-bold" onSubmit={SubmitRegistation}>
                            <h1 className="flex justify-center -mt-8 mb-5 text-3xl text-center font-serif">
                                Create Account
                            </h1>
                            <div className="my-8">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 outline-none border-2 border-gray-400 focus:border-[3px] focus:border-blue-600 rounded-lg ps-5 text-bl2ck font-normal"
                                />
                            </div>
                            <div className="my-8">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Enter Your Email..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 outline-none border-2 border-gray-400 focus:border-[3px] focus:border-blue-600 rounded-lg ps-5 text-bl2ck font-normal"
                                />
                            </div>
                            <div className="mb-5 relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Enter the Password..."
                                    onChange={handleLoginChange}
                                    className="block w-full mx-auto mt-2 h-12 outline-none border-2 border-gray-400 focus:border-[3px] focus:border-blue-600 rounded-lg ps-5 text-bl2ck font-normal"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-5 flex items-center text-blue-600 hover:text-blue-800 focus:outline-none"
                                >
                                    {showPassword ? <VscEyeClosed size={25} /> : <VscEye size={25} />}
                                </button>
                            </div>
                            <div className="mb-5 relative">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Your Password..."
                                    onChange={handleLoginChange}
                                    className={`block w-full mx-auto mt-2 h-12 outline-none border-2 ${passwordMatch ? "border-green-500 focus:border-green-500" : "border-gray-400 focus:border-red-500"
                                        } focus:border-[3px] rounded-lg ps-5 text-bl2ck font-normal`}
                                />
                                {passwordMatch && (
                                    <p className="text-green-500 text-sm mt-1">Passwords match!</p>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <button className="w-full h-12 text-xl mt-5 py-2 px-10 rounded-lg text-white duration-300 bg-indigo-700 hover:ring-1 hover:bg-indigo-600 ring-indigo-700 font-bold font-serif">
                                    {loading ? (
                                        <div className="flex justify-center items-center">
                                            <Loading />
                                        </div>
                                    ) : "Sign Up"}
                                </button>
                            </div>
                            <p className="font-normal text-gray-600 flex justify-center items-center mt-1">Already have an Account?
                                <a href="/" className="text-indigo-600 font-semibold ml-1 hover:underline">Log In</a>
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