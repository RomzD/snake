import { environment } from '../environments';

type EnvKeys = keyof typeof environment;

export const EnvironmentKeys = (
  Object.keys(environment) as Array<EnvKeys>
).reduce<Record<EnvKeys, EnvKeys>>(
  (acc, item) => {
    acc[item] = item;
    return acc;
  },
  {} as Record<EnvKeys, EnvKeys>,
);
