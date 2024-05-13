import {UiSegment} from "../components/UiButtons";

export enum DataSort {
  LOW_PRICE = "LOW_PRICE",
  FASTEST = "FASTEST",
  OPTIMAL = "OPTIMAL"
}

export const segments: UiSegment[] = [
  {
    text: 'Найдешевший',
    value: DataSort.LOW_PRICE
  },
  {
    text: 'Найшвидший',
    value: DataSort.FASTEST
  },
  {
    text: 'Оптимальний',
    value: DataSort.OPTIMAL
  },
]
