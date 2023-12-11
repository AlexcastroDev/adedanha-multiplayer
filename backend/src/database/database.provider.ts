import { connectionSource as dataSource } from "./ormconfig";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      return dataSource.initialize();
    },
  },
];
