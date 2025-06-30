import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Layoutt from '../components/Layoutt';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Login = () => {
    const [user, setUser] = useState({
        UEmail: "",
        Upassword: ""
    });

    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5001/api/authuser/login", user, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });

            setResult("Login successful");
            setError(null);

            setTimeout(() => {
                setResult(null);
                navigate("/dashboard");
            }, 3000);

            setUser({
                UEmail: "",
                Upassword: ""
            });
        } catch (err) {
            setResult(null);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="bg-white h-screen overflow-y-auto">
            <Layoutt>
                <Layout>
                    <div className="flex min-h-screen items-center justify-center">
                        <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-lg">
                            <h2 className="text-center text-2xl font-bold">Sign In</h2>

                            {result && (
                                <div className="flex items-center gap-2 bg-green-100 text-green-700 p-3 rounded-md">
                                    <FaCheckCircle className="text-green-600 text-lg" />
                                    <span>{result}</span>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center gap-2 bg-red-100 text-red-700 p-3 rounded-md">
                                    <FaTimesCircle className="text-red-600 text-lg" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        name="UEmail"
                                        type="email"
                                        required
                                        onChange={handleChange}
                                        value={user.UEmail}
                                        className="w-full mt-1 p-2 border rounded-md bg-green-50"
                                        placeholder="example@coconut.lk"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        name="Upassword"
                                        type="password"
                                        required
                                        onChange={handleChange}
                                        value={user.Upassword}
                                        className="w-full mt-1 p-2 border rounded-md bg-green-50"
                                        placeholder="*****"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-green-700 hover:bg-green-800 text-white p-2 rounded-md"
                                >
                                    Sign In
                                </button>
                            </form>

                            <p className="text-center text-sm">
                                Not a member? <Link to="/register" className="text-green-800">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </Layout>
            </Layoutt>
        </div>
    );
};

export default Login;
