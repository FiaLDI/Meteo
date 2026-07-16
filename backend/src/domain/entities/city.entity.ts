export class City {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly createdAt: Date,
  ) {}

  static create(data: {
    name: string;
    latitude: number;
    longitude: number;
  }): City {
    return new City(
      '',
      data.name,
      data.latitude,
      data.longitude,
      new Date(),
    );
  }

  static restore(data: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
  }): City {
    return new City(
      data.id,
      data.name,
      data.latitude,
      data.longitude,
      data.createdAt,
    );
  }

  equals(city: City): boolean {
    return this.id === city.id;
  }
}
