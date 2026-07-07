
import { Weather, WeatherApi, WeathertoreProvider } from "@/entities/weather";
import AddCityForm from "@/features/add-city/AddCityForm";
import CityList from "@/widgets/CityList/CityList";

export default async function Home() {

  let weather: Weather | null;

  try {
    weather = await WeatherApi.fetchWeather({})
  } catch(e) {
    console.log(e)
    weather = null
  }

  return (
    <WeathertoreProvider weather={weather}>
      <div className=" bg-gray-700 h-screen">
        <h1 className="bg-gray-900 p-3 text-2xl">Meteo</h1>

        <AddCityForm />

        <CityList />
      </div>
    </WeathertoreProvider>
  );
}
