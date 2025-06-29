import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Layoutt from '../components/Layoutt';

const Addfertiliser = () => {
    
    const [Fertiliser, setFertiliser] = useState({
        Soiltype: "",
        Coconuttype: "",
        Age:""
    });
    
    const containerRef = useRef(null);
    const [result, setResult] = useState(null); 
    const [setShowButton] = useState(false);


     const navigate = useNavigate();

     useEffect(() => {
       if (containerRef.current) {
         containerRef.current.scrollTo({
           top: containerRef.current.scrollHeight, 
           behavior: 'smooth', 
         });
       }
     }, []);
   
     const checkScroll = () => {
       if (!containerRef.current) return;
       const { scrollTop } = containerRef.current;
       setShowButton(scrollTop > 200);
     };
   
     useEffect(() => {
       const currentContainer = containerRef.current;
       currentContainer?.addEventListener('scroll', checkScroll);
       return () => currentContainer?.removeEventListener('scroll', checkScroll);
     }, []);
   
     
   


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFertiliser({
            ...Fertiliser,
            [name]: value
        })
    };

const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5001/api/fertiliser/addfertiliser", Fertiliser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setResult({
                fertilizer: response.data.fertilizer,
                numberOfApplications: response.data.numberOfApplications
            });

            setFertiliser({
                Soiltype: "",
        Coconuttype: "",
        Age:""
            });

        } catch (e) {
            alert("Something went wrong");
        } 
            
        
    };
    
    const handleAi = (e) => {
        navigate('/addmsg')
      }

    return (

        <div className="bg-white h-screen overflow-y-auto">
              
                <Layoutt>
              <Layout>

       
              <div className="flex min-h-screen items-center justify-center">
              <div className="w-full max-w-md p-6 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold">
                    Fertilize Manage
                </h2>
            
                <form onSubmit={handleSubmit} method="POST" className="space-y-4">
                    <div>
                        <label htmlFor="Soiltype" className="block text-sm font-medium text-gray-700">
                        Soil Type
                        </label>
                        <select
                            name="Soiltype"
                            type="text"
                            required
                            onChange={handleChange}
                            value={Fertiliser.Soiltype}
                            className="w-full mt-1 p-2 border rounded-md bg-green-50"
                           placeholder="select soil type"
                        >
                        <option value="" disabled>select type</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Clay">Clay</option>
                            <option value="Loamy">Loamy</option>
                            <option value="Organic">Organic</option>
                            </select>
                    </div>

                    <div>
                        <label htmlFor="Age" className="block text-sm font-medium text-gray-700">
                        Age (per years)
                        </label>
                        <select
                            name="Age"
                            required
                            onChange={handleChange}
                            value={Fertiliser.Age}
                            className="w-full mt-1 p-2 border rounded-md bg-green-50"
                            placeholder="select type"
                        >
                            <option value="" disabled>select age</option>
                            <option value="1-3">1-3</option>
                            <option value="4-5">4-5</option>
                            <option value=">5">5+</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="Coconuttype" className="block text-sm font-medium text-gray-700">
                            Coconut Type
                        </label>
                        <select
                            name="Coconuttype"
                            required
                            onChange={handleChange}
                            value={Fertiliser.Coconuttype}
                            className="w-full mt-1 p-2 border rounded-md bg-green-50"
                            placeholder="select type"
                        >
                            <option value="" disabled>select type</option>
                            <option value="Tall">Tall</option>
                            <option value="Dwarf">Dwarf</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white p-2 rounded-md "
                    >
                        Ok
                    </button>
                </form>

                {result && (
                    <div className="mt-1 p-1 border border-gray-300 rounded-md bg-gray-100">
                        <h3 className="text-lg font-semibold">Estimation Results:</h3>
                        <p>Fertilizer:</p><ul className="list-disc ml-6">
  <li>N: {result.fertilizer.N}</li>
  <li>P₂O₅: {result.fertilizer.P2O5}</li>
  <li>K₂O: {result.fertilizer.K2O}</li>
</ul>
                        <p>No Of Time: <strong>{result.numberOfApplications} </strong></p>
                    </div>

                )}
                <p className="text-center text-sm">
                 Become A Farmer? <Link to="/addland" className="text-green-800">Land management</Link>
                </p>
                 
        
             
            
                </div>
                </div>
         </Layout>
        </Layoutt>

      
        <button 
          onClick={handleAi}
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200"
          aria-label="Scroll to top"
        >
         <div className="relative group">
  <button 
    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
    aria-describedby="ai-tooltip"
  >
   <svg xmlns="http://www.w3.org/2000/svg" 
     viewBox="0 0 24 24" 
     className='text-gray-800'
     width="24" 
     height="24" 
     aria-label="Message"
     role="img">
  <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
</svg>
  </button>
  
 
  <div 
    id="ai-tooltip"
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block 
               bg-gray-800 text-white text-sm px-3 py-1 rounded-md 
               after:content-[''] after:absolute after:top-full after:left-1/2
               after:-translate-x-1/2 after:border-8 after:border-x-transparent 
               after:border-b-transparent after:border-t-gray-800"
  >
    Ask The Community 

    <span className="sr-only">(Community Help)</span>
  </div>
</div>
        </button>
   
    </div>

                    
    );
};

export default Addfertiliser;