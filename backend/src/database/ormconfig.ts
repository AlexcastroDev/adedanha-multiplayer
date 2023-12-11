import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  type: "mongodb",
  url: "mongodb://admin:admin@localhost:27017/container?authSource=admin",
  database: "container",
  entities: [
    __dirname + "/../**/*.entity{.ts,.js}",
  ],
  synchronize: true,
});
