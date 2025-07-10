"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { useTranslations } from "next-intl";
import Topsection from '@/components/dashboard/topsection';
import ActionButton from '@/components/dashboard/ActionButton';
import { AddRouteForm } from '@/components/dialogs/addRoute';


interface Route {
  id: string;
  from: string;
  to: string;
  priceRwf: number;
  travelTime: string;
  distance: string;
}

const TableHeader: React.FC = () => {
  const t = useTranslations("route");

  return (
    <thead className="bg-gray-100">
      <tr>
        {[
          {
            key: 'from',
            label: t("table.from")
          },
          {
            key: 'to',
            label: t("table.to")
          },
          {
            key: 'price',
            label: t("table.price")
          },
          {
            key: 'travel-time',
            label: t("table.travelTime")
          },
          {
            key: 'distance',
            label: t("table.distance")
          },
          {
            key: 'action',
            label: t("table.actions")
          }
        ].map(({ key, label }) => (
          <th
            key={key}
            scope="col"
            className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

interface TableRowProps {
  route: Route;
  index: number;
  onEdit: (route: Route) => void;
  onDelete: (routeId: string) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  route,
  index,
  // onEdit,
  // onDelete
}) => {
  // const handleEdit = useCallback(() => onEdit(route), [route, onEdit]);
  // const handleDelete = useCallback(() => onDelete(route.id), [route.id, onDelete]);

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
        }`}
    >
      <td className="py-4 px-4 text-gray-900 font-medium whitespace-nowrap">{route.from}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{route.to}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
        {route.priceRwf.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{route.travelTime}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{route.distance}</td>
      <td className="py-4 px-4 whitespace-nowrap">
        <ActionButton />
      </td>
    </tr>
  );
};

const RoutesManagement: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>(() =>
    Array.from({ length: 11 }, (_, index) => ({
      id: `route-${index + 1}`,
      from: 'Kigali',
      to: ['Uganda', 'Tanzania', 'Burundi', 'DRC'][index % 4],
      priceRwf: 15000 + (index * 2000),
      travelTime: `${8 + index % 4}h ${30 + (index * 10) % 60}min`,
      distance: `${100 + (index * 20)} km`
    }))
  );

  const t = useTranslations("route");

  const handleAddRoute = useCallback((newRoute: Route) => {
    setRoutes(prev => [...prev, newRoute]);
  }, []);

  const handleEditRoute = useCallback((route: Route) => {
    console.log('Edit route:', route);

  }, []);

  const handleDeleteRoute = useCallback((routeId: string) => {
    console.log('Delete route:', routeId);

  }, []);

  const displayedRoutesCount = useMemo(() => routes.length, [routes]);
  const totalRoutesCount = routes.length;

  return (
    <div>
      <Topsection />
      <div className="py-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">
              {t("title")}
            </h1>
            <p className="text-sm text-gray-500">
              {t("showingRoutes", { displayed: displayedRoutesCount, total: totalRoutesCount })}
            </p>
          </div>
          <AddRouteForm onAddRoute={handleAddRoute} />
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
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
            <p className="text-gray-500 text-lg mb-4">{t("noRoutesFound")}</p>
            <AddRouteForm onAddRoute={handleAddRoute} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesManagement;