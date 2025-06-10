"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState("");
  const [weather, setWeather] = useState(null);
  const [dayNight, setDayNight] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${req || "Chandigarh"}`
      );
      setWeather(res.data);
      setDayNight(res.data.current.is_day);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 transition-colors duration-500 ${
        dayNight === 1
          ? "bg-gradient-to-br from-blue-300 to-indigo-500"
          : "bg-gradient-to-br from-gray-800 to-black"
      }`}
    >
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mb-8">
        <Input
          className="h-12 px-4 bg-white rounded-xl text-black shadow-md w-full"
          placeholder="Enter city (e.g., Panipat)"
          value={req}
          onChange={(e) => setReq(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
        />
        <Button
          onClick={fetchWeather}
          className="h-12 px-4 bg-yellow-400 text-black hover:bg-yellow-300 rounded-xl shadow-md"
        >
          <Search />
        </Button>
      </div>

      {/* Weather Info */}
      {weather ? (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-black space-y-3 text-center">
          <h1 className="text-2xl font-bold">
            {weather.location.name}, {weather.location.region}
          </h1>
          <h2 className="text-sm text-gray-500">{weather.location.country}</h2>
          <h2 className="text-sm text-gray-500">
            {weather.location.localtime} - {weather.location.tz_id}
          </h2>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <img src={weather.current.condition.icon} alt="icon" className="w-16 h-16" />
            <div>
              <h3 className="text-xl font-semibold">{weather.current.condition.text}</h3>
              <p className="text-sm">{dayNight ? "🌞 Daytime" : "🌙 Nighttime"}</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-left">
            <p>🌡 Temperature:</p>
            <p>{weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
            <p>💨 Wind:</p>
            <p>{weather.current.wind_kph} kph / {weather.current.wind_mph} mph</p>
            <p>💧 Humidity:</p>
            <p>{weather.current.humidity}%</p>
            <p>🎯 Pressure:</p>
            <p>{weather.current.pressure_mb} mb</p>
          </div>
        </div>
      ) : loading ? (
        <p className="text-white mt-4">Loading weather data...</p>
      ) : (
        <p className="text-white mt-4">Enter a city name to see the weather 🌍</p>
      )}
    </div>
  );
};

export default Weather;
