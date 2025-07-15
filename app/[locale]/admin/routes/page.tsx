"use client";

import React, {useCallback, useMemo} from 'react';
import {useTranslations} from "next-intl";
import Topsection from '@/components/dashboard/topsection';
import ActionButton from '@/components/dashboard/ActionButton';
import {AddRouteForm} from '@/components/dialogs/addRoute';
import {RouteResponse} from "@/lib/types";
import {useDeleteRoute, useRoutes} from "@/hooks/useRoutes";
import {formatDuration} from "@/lib/utils";
import Loader from "@/components/ui/loader";


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
  route: RouteResponse;
  index: number;
  onEdit: (route: RouteResponse) => void;
  onDelete: (routeId: number) => void;
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
      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
        }`}
    >
      <td className="py-4 px-4 text-gray-900 font-medium whitespace-nowrap">{route.startLocation}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{route.endLocation}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">
        {route.price.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{formatDuration(route.travelTime)}</td>
      <td className="py-4 px-4 text-gray-700 whitespace-nowrap">{route.distance} km</td>
      <td className="py-4 px-4 whitespace-nowrap">
        <ActionButton onEdit={handleEdit} onDelete={handleDelete} />
      </td>
    </tr>
  );
};

const RoutesManagement: React.FC = () => {

  const t = useTranslations("route");

  const {data, isLoading: routesLoading, error: routesError} = useRoutes();
  const deleteRouteMutation = useDeleteRoute();

  const routesLength = data?.length ?? 0;
  const routes = data ?? [];



  const handleEditRoute = useCallback((route: RouteResponse) => {
    console.log('Edit route:', route);

  }, []);

  const handleDeleteRoute = useCallback(
      (routeId: number) => {
        deleteRouteMutation.mutate(routeId);
      },
      [deleteRouteMutation]
  );

  const displayedRoutesCount = useMemo(() => routesLength, [routesLength]);

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
              {t("showingRoutes", { displayed: displayedRoutesCount, total: routesLength })}
            </p>
          </div>
          <AddRouteForm  />
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <TableHeader />
              <tbody>
              {
                routes.map((route, index) => (
                    <TableRow
                        key={route.id}
                        route={route}
                        index={index}
                        onEdit={handleEditRoute}
                        onDelete={handleDeleteRoute}
                    />
                ))
              }
              </tbody>
            </table>
          </div>
        </div>

        {!routesError && !routesLoading && routes?.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg mb-4">{t("noRoutesFound")}</p>
              <AddRouteForm />
            </div>
        )}

        {routesLoading && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Loader />
            </div>
        )}

        {
          routesError && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-red-500 text-lg mb-4">{t("noRoutesError")}</p>
              </div>
            )
        }

      </div>
    </div>
  );
};

export default RoutesManagement;