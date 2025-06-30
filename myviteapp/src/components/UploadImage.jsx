import React, { useState } from 'react';
import axios from 'axios';
import Layout from './Layout';
import Layoutt from './Layoutt';



function UploadImage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000';

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setError('File size should not exceed 5MB');
        return;
      }
      setFile(selectedFile);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_URL}/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 second timeout
      });
      setPrediction(response.data);
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.response?.data?.error || 'Failed to connect with server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  const resetForm = () => {
    setFile(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
  };

  return (

    <Layoutt>
      <Layout>
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 font-['Inter'] text-gray-800">
        

          <div className="bg-white rounded-xl shadow-lg p-5 mb-5">
            <form onSubmit={handleSubmit}>
            <h2 className="text-center text-2xl font-bold">
            Coconut Tree Disease Detection
          </h2>
              <div className="mb-6 mt-8">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-gray-700 w-full mt-1 p-2 border rounded-md bg-green-50"
                >
        
                  <div className="flex justify-center items-center rounded-md  text-sm font-medium text-gray-700">
  {file ? file.name : 'Choose To Upload The Image'}
</div>

                  
                </label>

                {preview && (
                  <div className="relative mt-2 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    {loading && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || !file}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                    loading
                      ? 'bg-gray-200 cursor-not-allowed opacity-50'
                      : 'bg-green-700 hover:bg-green-800 text-white hover:shadow-md'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </button>

                {file && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-medium transition-colors duration-200"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            {prediction && (
              <div className="mt-10 bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-lg font-semibold">Analysis Results</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-600">Diagnosis:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      prediction.class.toLowerCase().includes('healthy')
                        ? 'bg-green-100 text-green-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {prediction.class}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-gray-600">Confidence Level:</span>
                    <span className="text-emerald-600 font-medium">
                      {(prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-gray-800 mb-4">Detailed Breakdown</h4>
                <ul className="space-y-3">
                  {Object.entries(prediction.all_predictions)
                    .sort((a, b) => b[1] - a[1])
                    .map(([name, value]) => (
                      <li
                        key={name}
                        className={`p-4 rounded-lg transition-colors ${
                          name === prediction.class
                            ? 'bg-emerald-50 border border-emerald-100'
                            : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-700">{name}</span>
                          <span className="text-gray-500 text-sm">
                            {(value * 100).toFixed(2)}%
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${value * 100}%` }}
                          />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}

           
          </div>
        </div>
      </Layout>
    </Layoutt>
  );
}

export default UploadImage;