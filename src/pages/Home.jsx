import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
  BsCloudHazeFill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
  TbTemperatureCelsius,
  ImSpinner8,
} from "../../node_modules/react-icons/all";

const API = "acc5f321d79121e451b7745acc6cb565";

const Home = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Tegal");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLocation(inputValue);
    }

    const input = document.querySelector("input");

    if (input.value === "") {
      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = "";

    e.preventDefault();
  };

  useEffect(() => {
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API}`;

    axios
      .get(url)
      .then((res) => {
        setTimeout(() => {
          setData(res.data);

          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg("");
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

  if (!data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-500 to-red-500">
        <div
          className="animate-spin"
          style={{
            backgroundImage: "linear-gradient(to right, #eab308, #ef4444)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <ImSpinner8 className="text-5xl text-none text-white" />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      break;
    case "Haze":
      icon = <BsCloudHazeFill />;
      break;
    case "Rain":
      icon = <IoMdRainy className="text-[#31cafb]" />;
      break;
    case "Clear":
      icon = <IoMdSunny className="text-[#ffde33]" />;
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill className="text-[#31cafb]" />;
      break;
    case "Snow":
      icon = <IoMdSnow className="text-[#31cafb]" />;
      break;
    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }


  const date = new Date();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-yellow-500 to-red-500 px-4 lg:px-0">
      {errorMsg && (
        <div className="absolute top-2 z-[999] w-full max-w-[90vw] rounded-md bg-red-600 p-4 capitalize text-white lg:top-10 lg:max-w-[450px]">{`${errorMsg.response.data.message}`}</div>
      )}
      <form
        className={` ${
          animate ? "animate-shake" : "animate-none"
        } mb-8 h-16 w-full max-w-[450px] rounded-full bg-black/30 backdrop-blur-[32px]`}
      >
        <div className="relative flex h-full items-center justify-between p-2">
          <input
            onChange={(e) => handleInput(e)}
            className="h-full flex-1 bg-transparent pl-6 text-[15px] font-light text-white outline-none placeholder:text-white"
            type="text"
            placeholder="Search by city or country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="flex h-12 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-red-500 transition hover:bg-[#15abdd]"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

      <div className="min-h-[584px] w-full max-w-[450px] rounded-[32px] bg-black/20 py-12 px-6 text-white backdrop-blur-[32px]">
        {loading ? (
          <div className="flex h-full w-full items-center justify-center">
            <ImSpinner8 className="animate-spin text-5xl text-white" />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-x-5">
              <div className="text-[87px]">{icon}</div>
              <div>
                <div className="text-2xl font-semibold">
                  {data.name}, {data.sys.country}
                </div>
                <div>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
                </div>
              </div>
            </div>

            <div className="my-20">
              <div className="flex items-center justify-center">
                <div className="text-[144px] font-light leading-none">
                  {parseInt(data.main.temp)}
                </div>
                <div className="text-4xl">
                  <TbTemperatureCelsius />
                </div>
              </div>

              <div className="text-center capitalize">
                {data.weather[0].description}
              </div>
            </div>

            <div className="mx-auto flex max-w-[378px] flex-col gap-y-6">
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  {/* icon */}
                  <div className="text-[20px]">
                    <BsEye />
                  </div>
                  <div>
                    Visibility{" "}
                    <span className="ml-2">{data.visibility / 1000} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsThermometer />
                  </div>
                  <div className="flex">
                    Feels like
                    <div className="ml-2 flex">
                      {parseInt(data.main.feels_like)}
                      <TbTemperatureCelsius />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWater />
                  </div>
                  <div>
                    Humidity{" "}
                    <span className="ml-2">{data.main.humidity} %</span>
                  </div>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-[20px]">
                    <BsWind />
                  </div>
                  <div>
                    Wind <span className="ml-2">{data.wind.speed} m/s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
