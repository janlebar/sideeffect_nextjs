import React, { useState } from 'react';
import Userinput from '../components/Userinput';
import RadarChart from '../components/chart';
import PieChart from '../components/piechart';
import Card from "../components/ui/Card";
import Head from 'next/head';
import { Inter } from 'next/font/google';
// import MainNavigation from '../components/layout/MainNavigation';
// import FormAi from '../components/FormAi';
import Lama from '../components/Llamatwo';
import UrlInput from '../components/Userinput';


const inter = Inter({ subsets: ['latin'] });

const color = [
  'rgba(255, 255, 0, 0.5)',       // Safety Yellow
  'rgba(255, 0, 0, 0.5)',         // Bright Red
  'rgba(51, 153, 255, 0.5)',      // High-Visibility Blue
  'rgba(204, 255, 102, 0.5)',     // Fluorescent Green
  'rgba(0, 153, 204, 0.5)',       // Electric Blue
  'rgba(255, 204, 0, 0.5)',       // Day-Glo Yellow
  'rgba(0, 255, 0, 0.5)',         // Neon Green
  'rgba(204, 0, 0, 0.5)',         // Signal Red
  'rgba(204, 255, 0, 0.5)',       // Fluo Yellow-Green
  'rgba(204, 0, 0, 0.5)',         // Warning Red
  'rgba(153, 51, 255, 0.5)',      // Vibrant Purple
  'rgba(255, 0, 255, 0.5)',       // Magenta
  'rgba(0, 204, 102, 0.5)',       // Emerald Green
  'rgba(153, 0, 204, 0.5)',       // Electric Purple
  'rgba(204, 204, 0, 0.5)',       // Neon Yellow
  'rgba(102, 204, 255, 0.5)',     // Sky Blue
  'rgba(0, 102, 204, 0.5)',       // Cornflower Blue
  'rgba(0, 204, 255, 0.5)'        // Aqua Blue
];


export default function MyMergedComponent() {
  const [data, setData] = useState();
  const [followingInput, setUrlInput] = useState();

  function onData(data) {
    setData(data);
  }

  function onUrlInputsFunc(returnedValue) {
    setUrlInput(returnedValue);
    console.log(returnedValue);
  }


  function ifempty(data) {
    return !data || data.length === 0;
  }

  return (
    <>
      <Head>
        <title>Sideeffects</title>
        <meta name="description" content="Sideeffects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <MainNavigation /> */}

      
      {/* Hero Section */}
        {/* Hero Section */}
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center" style={{ minHeight: "75vh" }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('/sideeffect.svg')" }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                  <img src="/sideeffectlogo.svg" alt="Side Effect" />
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden" style={{ height: "70px" }}>
            <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
              <polygon className="text-white fill-current" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>
      {/* Other sections */}

    <div className="card-container bg-white ">
      <section>
        {/* RadarChart and PieChart */}
        <Userinput onData={onData} onUrlInputsChanged={onUrlInputsFunc} krneki="test"/>
        <Card>
          {ifempty(data) ? (
            <p className="bg-red-300 text-white font-bold py-2 px-4 rounded-md">
            Search Medicine to generate chart
          </p>
          ) : (
            <RadarChart data={data} color={color} />
          )}
        </Card>
        <Card>
          {!ifempty(data) ? (
            <PieChart data={data} color={color} />
          ) : (
            <p className="bg-red-300 text-white font-bold py-2 px-4 rounded-md">
              No data available for chart</p>
          )}
        </Card>
        <Card>
        <Lama followingInput={followingInput}/>
        </Card>
      </section>
    </div>

            {/* Other sections */}
{/* Services Section */}
<section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                  <div className="p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full" style={{ background: 'linear-gradient(to right, white 50%, #0074e4 50%)', clipPath: 'ellipse(100% 50%)' }}>
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold ml-5">Sideeffects</h6>
                    <p className="mt-2 mb-4 text-gray-600 ml-5">
                      +
                    </p>
                  </div>
                </div>
              </div>
              {/* Add more service cards */}
            </div>
          </div>
        </section>



            {/* Other sections */}
{/* Services Section */}
<section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                
              </div>
              {/* Add more service cards */}
            </div>
          </div>
        </section>








{/* Contact Section */}
<section className=" z-10">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-center lg:-mt-100 -mt-100">
      <div className="w-full lg:w-6/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300">
          <div className="flex-auto p-5 lg:p-10">


            <div className="relative w-full mb-3 mt-8">
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="full-name"
              >
                Full Name
              </label>
              <input
                type="text"
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Full Name"
                style={{ transition: "all .15s ease" }}
              />
            </div>
            {/* Add more form fields */}
            <div className="text-center mt-6">
              <button
                className="bg-blue-400 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </>

  );
  
}
