import React from "react";
import { BusCompany } from "../types/bus";

interface ModalProps {
  company: BusCompany;
  onClose: () => void;
}

export const RoutesModal: React.FC<ModalProps> = ({ company, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="border border-[#0B3B2E] rounded-lg p-6 w-[90%] max-w-md relative">
        <h3 className="text-xl font-bold mb-4 text-green-700">
          {company.name} Routes
        </h3>
        <ul className="space-y-2">
          {company.routes.map((route, index) => (
            <li key={index} className="border-b pb-2">
              <p>
                <span className="font-semibold">From:</span> {route.from}
              </p>
              <p>
                <span className="font-semibold">To:</span> {route.to}
              </p>
              <p>
                <span className="font-semibold">Price:</span> {route.price}
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};
