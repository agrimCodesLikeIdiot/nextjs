"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [sname, setSname] = useState();
  const [units, setUnits] = useState("metric");

  const [temp, setTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [wind, setWind] = useState();
  const [visibilty, setVisibilty] = useState();
  const [feels, setFeels] = useState();

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
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=38334a8188792417c8a04443ee8ffaa5`
  )
    .then((data) => data.json())
    .then((res) => {
      console.log(res);
      setSname(res.name);
      setTemp(Math.round(res.main.temp));
      setVisibilty(res.visibility);
      setHumidity(res.main.humidity);
      setWind(Math.round(res.wind.speed));
      setFeels(Math.round(res.main.feels_like));
    });
  return (
    <>
      <nav className="flex justify-center items-center p-[30px] font-bold text-lg space-x-2">
        {sname}
      </nav>
      <div className="absolute left-[50%] translate-x-[-50%]">
        <div className="bg-black text-[rgb(255,255,0)] pl-[10px] pr-[10px] text-center rounded-3xl">
          {lat}° {lon}°
        </div>
        <h1 className="text-[160px] font-semibold">{temp}°C</h1>
        <h1 className="text-lg font-extrabold lg:p-0 p-2">Daily Summary</h1>
        <p className="text-[14px] font-semibold lg:p-0 p-2">
          Currently temperature in <a href={`https://google.com/search?q=${sname}`} target="_blank" className="underline hover:no-underline">{sname}</a> is {temp}°C <br></br> but it feels
          like {feels}°C.
        </p>
        <div className="flex justify-center space-x-10 p-2.5 rounded-lg w-[374px] bg-black text-[rgb(255,255,0)] mt-[10px]">
          <div className="flex flex-col space-y-2">
            <img
              src="https://img.icons8.com/fluency-systems-regular/60/ffff00/wind.png"
              alt="wind"
            />
            <div>
              <h1 className="font-semibold text-xl text-center">{wind}km/h</h1>
              <h1 className="text-lg text-center">Wind</h1>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/ios-glyphs/60/ffff00/hygrometer.png"
              alt="hygrometer"
            />
            <div>
              <h1 className="font-semibold text-xl text-center">{humidity}%</h1>
              <h1 className="text-lg text-center">Humidity</h1>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <img
              width="60"
              height="60"
              src="https://img.icons8.com/windows/60/ffff00/visible--v1.png"
              alt="visible--v1"
            />
            <div>
              <h1 className="font-semibold text-xl text-center">
                {visibilty}m
              </h1>
              <h1 className="text-lg text-center">Visibility</h1>
            </div>
          </div>
        </div>
        <br></br>
        <div className="flex space-x-2">
          <iframe
            className="rounded-lg w-[374px] h-[374px]"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}zoom=11&level=surface&overlay=temp&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            frameborder="0"
          ></iframe>
          <iframe
            className="rounded-lg w-[374px] h-[374px]"
            src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}zoom=11&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            frameborder="0"
          ></iframe>
        </div>
        <br></br>
      </div>
    </>
  );
}
