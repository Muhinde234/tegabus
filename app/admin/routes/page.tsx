'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import Topsection from '@/components/dashboard/topsection';

// Types
interface Route {
  id: string;
  from: string;
  to: string;
  priceRwf: number;
  travelTime: string;
  distance: string;
}

interface ActionButtonProps {
  onClick: () => void;
  variant: 'edit' | 'delete';
  'aria-label': string;
}


const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  variant, 
  'aria-label': ariaLabel 
}) => {
  const baseClasses = "p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    edit: "text-gray-600 hover:text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    delete: "text-gray-600 hover:text-red-600 hover:bg-red-50 focus:ring-red-500"
  };

  const Icon = variant === 'edit' ? Edit2 : Trash2;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
      aria-label={ariaLabel}
    >
      <Icon size={16} />
    </button>
  );
};

const TableHeader: React.FC = () => (
  <thead className="bg-gray-50 border-b border-gray-200">
    <tr>
      {[
        { key: 'from', label: 'From' },
        { key: 'to', label: 'To' },
        { key: 'price', label: 'Price/Rwf' },
        { key: 'travel-time', label: 'Travel Time' },
        { key: 'distance', label: 'Distance' },
        { key: 'action', label: 'Action' }
      ].map(({ key, label }) => (
        <th 
          key={key}
          scope="col"
          className="text-left py-3 px-4 font-medium text-gray-700 text-sm"
        >
          {label}
        </th>
      ))}
    </tr>
  </thead>
);

interface TableRowProps {
  route: Route;
  index: number;
  onEdit: (route: Route) => void;
  onDelete: (routeId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({ 
  route, 
  index, 
  onEdit, 
  onDelete 
}) => {
  const handleEdit = useCallback(() => onEdit(route), [route, onEdit]);
  const handleDelete = useCallback(() => onDelete(route.id), [route.id, onDelete]);

  return (
    <tr 
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
      }`}
    >
      <td className="py-4 px-4 text-gray-900 font-medium">{route.from}</td>
      <td className="py-4 px-4 text-gray-700">{route.to}</td>
      <td className="py-4 px-4 text-gray-700">
        {route.priceRwf.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-gray-700">{route.travelTime}</td>
      <td className="py-4 px-4 text-gray-700">{route.distance}</td>
      <td className="py-4 px-4">
        <div className="flex gap-2">
          <ActionButton
            onClick={handleEdit}
            variant="edit"
            aria-label={`Edit route from ${route.from} to ${route.to}`}
          />
          <ActionButton
            onClick={handleDelete}
            variant="delete"
            aria-label={`Delete route from ${route.from} to ${route.to}`}
          />
        </div>
      </td>
    </tr>
  );
};


const RoutesManagement: React.FC = () => {

  const [routes] = useState<Route[]>(() => 
    Array.from({ length: 11 }, (_, index) => ({
      id: `route-${index + 1}`,
      from: 'Kigali',
      to: 'Uganda',
      priceRwf: 20000,
      travelTime: '9h 50min',
      distance: '120 km'
    }))
  );


  const handleAddRoute = useCallback(() => {
    console.log('Add new route');
  
  }, []);

  const handleEditRoute = useCallback((route: Route) => {
    console.log('Edit route:', route);
   
  }, []);

  const handleDeleteRoute = useCallback((routeId: string) => {
    console.log('Delete route:', routeId);

  }, []);

 
  const displayedRoutesCount = useMemo(() => routes.length, [routes]);
  const totalRoutesCount = 50; 

  return (
    <div className="px-6 bg-gray-50 min-h-screen">
      <Topsection/>
      <div>
    
        <header className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              Routes
            </h1>
            <p className="text-sm text-gray-500">
              Showing {displayedRoutesCount} of {totalRoutesCount} routes
            </p>
          </div>
          
          <button
            onClick={handleAddRoute}
            className="flex items-center gap-2 bg-[#1EA17E] text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            aria-label="Add new route"
          >
            <Plus size={20} />
            Add
          </button>
        </header>

        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <TableHeader />
              <tbody>
                {routes.map((route, index) => (
                  <TableRow
                    key={route.id}
                    route={route}
                    index={index}
                    onEdit={handleEditRoute}
                    onDelete={handleDeleteRoute}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

     
        {routes.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No routes found</p>
            <button
              onClick={handleAddRoute}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Add your first route
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesManagement;