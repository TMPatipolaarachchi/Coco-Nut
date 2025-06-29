import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUpload, FiCamera, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import Layout from '../components/Layout';
import Layoutt from '../components/Layoutt';
function Plantdetection() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResults(null);
      setError('');
    }
  };

  const analyzePlant = async () => {
    if (!image) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5005/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen overflow-y-auto" >
         <Layoutt>
                <Layout>
                  <div className="mt-6 text-left">
                   
                   
        
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-6">Plant Disease Detection</h1>
        
        <div className="mb-8">
          <p className="text-gray-600 mb-4">
            Our specialized coconut disease detection system helps identify common coconut leaf diseases.
          </p>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">How it works:</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Capture clear photos of coconut leaves showing symptoms</li>
              <li>Our AI system will analyze the images</li>
              <li>Get instant identification of potential diseases</li>
            </ul>
          </div>
        </div>

        {/* Integrated Plant Detection Component */}
        <div className="mt-8">
          {/* Upload Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {preview ? (
                  <div className="mb-4">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-64 mx-auto rounded-lg shadow-sm"
                    />
                  </div>
                ) : (
                  <div className="text-gray-400 mb-4">
                    <FiCamera className="w-12 h-12 mx-auto" />
                    <p>No image selected</p>
                  </div>
                )}

                <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition">
                  <FiUpload className="mr-2" />
                  {image ? 'Change Image' : 'Upload Image'}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange}
                    className="hidden" 
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          {image && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
              <div className="p-6">
                <button
                  onClick={analyzePlant}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg flex items-center justify-center ${
                    loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
                  } text-white font-medium transition`}
                >
                  {loading ? (
                    <>
                      <FiLoader className="animate-spin mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Plant Health'
                  )}
                </button>

                {error && (
                  <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                    <FiAlertCircle className="mr-2" />
                    {error}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results Display */}
          {results && (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-green-800 mb-4">Analysis Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Disease Detection */}
                  <div className="border border-green-100 rounded-lg p-4">
                    <h3 className="font-medium text-green-700 mb-3 flex items-center">
                      <FiAlertCircle className="mr-2" />
                      Disease Detection
                    </h3>
                    {results.diseases?.length > 0 ? (
                      <ul className="space-y-2">
                        {results.diseases.map((disease, index) => (
                          <li key={index} className="text-red-600">
                            • {disease.name} ({disease.confidence}% confidence)
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-green-600 flex items-center">
                        <FiCheckCircle className="mr-2" />
                        No diseases detected
                      </p>
                    )}
                  </div>

                  {/* Nutrient Analysis */}
                  <div className="border border-green-100 rounded-lg p-4">
                    <h3 className="font-medium text-green-700 mb-3 flex items-center">
                      <FiCheckCircle className="mr-2" />
                      Nutrient Status
                    </h3>
                    {results.nutrients?.map((nutrient, index) => (
                      <div key={index} className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span>{nutrient.name}</span>
                          <span className={`${
                            nutrient.status === 'deficient' ? 'text-red-600' : 
                            nutrient.status === 'sufficient' ? 'text-green-600' : 'text-yellow-600'
                          }`}>
                            {nutrient.status}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              nutrient.status === 'deficient' ? 'bg-red-500' : 
                              nutrient.status === 'sufficient' ? 'bg-green-500' : 'bg-yellow-500'
                            }`} 
                            style={{ width: `${nutrient.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
                
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animated Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <button
          onClick={() => {
            const newTab = window.open("http://localhost:5174/sign-up","_blank");
            if (newTab) {
              alert("Disease detection opened in a new tab! You can continue using the Market System here.");
              window.focus(); 
            } else {
              alert("Please allow pop-ups for this site!");
            }
          }}
          className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none pulse-animation"
          aria-label="Detect Disease"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {/* Tooltip */}
        <div className="absolute right-0 bottom-full mb-4 hidden group-hover:block bg-gray-800 text-white text-sm px-3 py-2 rounded-md whitespace-nowrap">
          Coconut GuardSL
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-800"></div>
        </div>
      </div>

      {/* Custom Animation CSS */}
      <style jsx>{`
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(16, 185, 129, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }
      `}</style>
    
                  </div>
                </Layout>
              </Layoutt>
    </div>
  );
}

export default Plantdetection;