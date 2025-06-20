import { BusCompany } from "../types/bus";

const busCompanies: BusCompany[] = [
  {
    name: "Ritco",
    numberOfBuses: 25,
    routes: [
      { from: "Kigali", to: "Huye", price: "5,000 RWF" },
      { from: "Kigali", to: "Rubavu", price: "6,000 RWF" },
    ],
  },
  {
    name: "Trinity",
    numberOfBuses: 18,
    routes: [
      { from: "Kigali", to: "Musanze", price: "4,500 RWF" },
      { from: "Kigali", to: "Nyagatare", price: "6,200 RWF" },
    ],
  },
  {
    name: "Horizon",
    numberOfBuses: 30,
    routes: [
      { from: "Kigali", to: "Rusizi", price: "7,000 RWF" },
      { from: "Kigali", to: "Ngoma", price: "5,800 RWF" },
    ],
  },
];

export default busCompanies;