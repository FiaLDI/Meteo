import { CityList } from "@/widgets/city-list";
import { WeatherList } from "@/widgets/weather-list";

export default async function Home() {

  return (
      <div className="flex flex-col lg:grid lg:grid-cols-3">
        <CityList />
        <WeatherList />
      </div>
  );
}
