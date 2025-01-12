import SearchableSelect from "@/components/SearchableSelect";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BioTextarea from "./BioTextarea";

function SignupFormStepThree() {
  const [country, setCountryName] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [userData, setUserData] = useState({
    gender: "",
    heading: "",
    bio: "",
    city: "",
    country: "",
  });

  function setCodeForCountry(name: string) {
    setCountryName(name);
  }

  const fetchCountries = async () => {
    const countries = await axios.get("https://restcountries.com/v3.1/all");
    setCountriesData(countries.data);
  };

  const getBio = (biodata: string) => {
    setUserData((prev) => ({ ...prev, bio: biodata }));
  };

  const handleSkipAndSubmit = async () => {
    try {
      console.log("SKIPPED...!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="mt-12">
      <h1 className="text-4xl my-5 text-white tracking-wide font-bold text-center">
        Shape Your Global Presence
      </h1>

      <div className="mt-6">
        <h2 className="text-xl text-gray-300 font-semibold mb-3">
          Share Your Details
        </h2>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Heading that represent you in few words"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, heading: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <BioTextarea getBio={getBio} />
            {countriesData && (
              <SearchableSelect
                countriesData={countriesData}
                setCodeForCountry={setCodeForCountry}
              />
            )}
            <input
              type="text"
              placeholder="Enter your city"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, city: e.target.value }))
              }
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              required
            />
            <div className="my-2">
              <div className="w-64">
                <select
                  required
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  name="gender"
                  className="block w-full p-3 bg-slate-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="" disabled selected>
                    Select gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
            </div>

            <button
              className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:from-purple-500 hover:to-blue-500 transform hover:scale-105 transition-all duration-300`}
              type="submit"
            >
              Save & Proceed
            </button>
          </form>
        </div>
        <button
          onClick={handleSkipAndSubmit}
          className="text-blue-600 my-5 hover:underline"
        >
          skip
        </button>
      </div>
    </div>
  );
}

export default SignupFormStepThree;
