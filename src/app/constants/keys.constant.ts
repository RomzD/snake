import { environment } from '../environments';

export const Keys = {
  ArrowDown: {
    value: Math.sqrt(environment.cells),
  },
  ArrowUp: {
    value: -Math.sqrt(environment.cells),
  },
  ArrowRight: {
    value: 1,
  },
  ArrowLeft: {
    value: -1,
  },
};
