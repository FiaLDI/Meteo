export class Weather {
  private constructor(
    public readonly id: string,
    public readonly cityId: string,
    public readonly day: number,
    public readonly date: Date,
    public readonly min: number,
    public readonly max: number,
    public readonly wind: number,
    public readonly weatherCode: number,
    public readonly isStale: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(data: {
    cityId: string;
    day: number;
    date: Date;
    min: number;
    max: number;
    wind: number;
    weatherCode: number;
  }): Weather {
    return new Weather(
      '',
      data.cityId,
      data.day,
      data.date,
      data.min,
      data.max,
      data.wind,
      data.weatherCode,
      false,
      new Date(),
    );
  }

  static restore(data: {
    id: string;
    cityId: string;
    day: number;
    date: Date;
    min: number;
    max: number;
    wind: number;
    weatherCode: number;
    isStale: boolean;
    createdAt: Date;
  }): Weather {
    return new Weather(
      data.id,
      data.cityId,
      data.day,
      data.date,
      data.min,
      data.max,
      data.wind,
      data.weatherCode,
      data.isStale,
      data.createdAt,
    );
  }

  markAsStale(): Weather {
    return new Weather(
      this.id,
      this.cityId,
      this.day,
      this.date,
      this.min,
      this.max,
      this.wind,
      this.weatherCode,
      true,
      this.createdAt,
    );
  }

  isActual(): boolean {
    return !this.isStale;
  }
}
