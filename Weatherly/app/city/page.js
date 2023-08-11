"use client";

import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState()
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()
  const [sname, setSname] = useState();
  const [units, setUnits] = useState("metric");

  const [temp, setTemp] = useState();
  const [lowTemp, setLowTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [visibilty, setVisibilty] = useState();
  const [feels, setFeels] = useState();
  const [desc, setDesc] = useState();
  const [icon, setIcon] = useState();

  const d = new Date();
  const date = d.getDate;
  const month = d.getMonth;
  const year = d.getFullYear;

  if (typeof window != "undefined") {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);
    });
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=38334a8188792417c8a04443ee8ffaa5`
  )
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      setSname(res.name);
      setTemp(Math.round(res.main.temp));
      setLowTemp(Math.round(res.main.temp_min));
      setVisibilty(res.visibility);
      setHumidity(res.main.humidity);
      setWind(Math.round(res.wind.speed));
      setFeels(Math.round(res.main.feels_like));
      setDesc(res.weather[0].main);
      setIcon(res.weather[0].icon);
    });
  return (
    // #141b24
    // ##1a2430
    // #0c0d11
    <>
      <div className="p-[60px] lg:block hidden">
        <nav className="fixed top-0 left-0 right-0 w-screen h-[60px] flex items-center justify-center">
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/search--v1.png"
            alt="search--v1"
            className="p-2 absolute"
          />
          <input
            className="placeholder:text-white absolute w-[90%] h-[40px] rounded-3xl bg-[#1a2430] pl-[60px] outline-none focus:bg-[#0c0d11] transiton ease-in-out duration-300"
            placeholder="Search weather by city name. example: London"
            onChange={(e) => setCity(e.target.value)}
          />
        </nav>
        <div className="flex space-x-2 mt-[40px]">
          <div className="w-[500px] h-[260px] bg-[#1a2430] rounded-lg p-[15px]">
            <div className="flex flex-col">
              <h1 className="text-gray-500 font-xl font-bold">{sname}</h1>
              <div className="flex space-x-16 items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  />
                  <h1 className="text-7xl font-semibold">
                    {temp}
                    <span className="text-5xl">°C</span>
                  </h1>
                </div>
                <div className="flex flex-col text-gray-500">
                  <span className="font-bold text-xl">{desc}</span>
                  <span className="font-semibold text-lg">
                    Feels like {feels}°C
                  </span>
                </div>
              </div>
              <p className="text-white font-light text-lg font-mono">
                There will be {desc} in{" "}
                <a
                  href={`https://google.com/search?q=${sname}`}
                  target="_blank"
                  className="hover:no-underline underline transition ease-in-out duration-300"
                >
                  {sname}
                </a>{" "}
                <br></br> with a low of {lowTemp}
                °C.
              </p>
              <div className="flex space-x-8 mt-[10px]">
                <div>
                  <h1 className="font-semibold text-gray-500 text-[14px]">
                    Wind
                  </h1>
                  <h1 className="font-lg text-white">{wind}km/h</h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-500 text-[14px]">
                    Humidity
                  </h1>
                  <h1 className="font-lg text-white">{humidity}%</h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-500 text-[14px]">
                    Visibility
                  </h1>
                  <h1 className="font-lg text-white">{visibilty}m</h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-500 text-[14px]">
                    Air Quality
                  </h1>
                  <h1 className="font-lg text-white">In Dev</h1>
                </div>
              </div>
            </div>
          </div>
          <iframe
            width="260"
            height="260"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=260&height=260&zoom=6&level=surface&overlay=temp&product=ecmwf&menu=&message=true&marker=false&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
            frameborder="0"
            className="rounded-lg"
          ></iframe>
          <iframe
            width="260"
            height="260"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=260&height=260&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=false&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
            frameborder="0"
            className="rounded-lg"
          ></iframe>
          <iframe
            width="260"
            height="260"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=260&height=260&zoom=6&level=surface&overlay=pressure&product=ecmwf&menu=&message=true&marker=false&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
            frameborder="0"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </>
  );
}
