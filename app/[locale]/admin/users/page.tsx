"use client";

import {useTranslations} from "next-intl";
import ActionButton from "@/components/dashboard/ActionButton";
import StatsCard from "@/components/dashboard/statCard";
import Topsection from "@/components/dashboard/topsection";
import {AddUserForm} from "@/components/dialogs/addUser";
import React from "react";
import {useRoleStats, useUsers} from "@/hooks/useUsers";


export default function UsersPage() {
  const {data, isLoading:usersLoading, isError:usersError} = useUsers();
  const {data:stats, isLoading, isError} = useRoleStats();

  const apiUsers = data?.content ?? [];

  const t = useTranslations("users");

  const tableHeads = [
    t("table.firstName"),
    t("table.lastName"),
    t("table.phone"),
    t("table.role"),
    t("table.country"),
    t("table.actions"),
  ];


  const getRoleTranslation = (role: string) => {
    switch (role) {
      case "Admin":
        return t("roles.admin");
      case "User":
        return t("roles.user");
      case "Verifier":
        return t("roles.verifier");
      default:
        return role;
    }
  };

  return (
    <div>
      <Topsection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
            title={t("stats.passengers")}
            value={stats?.roleCounts.PASSENGER ?? 0}
            description={t("stats.passengersDescription")}
            color="green"
        />
        <StatsCard
            title={t("stats.managers")}
            value={stats?.roleCounts.MANAGER ?? 0}
            description={t("stats.managersDescription")}
            color="blue"
        />
        <StatsCard
            title={t("stats.administrator")}
            value={stats?.roleCounts.ADMIN ?? 0}
            description={t("stats.administratorDescription")}
            color="orange"
        />
        <StatsCard
            title={t("stats.verifiers")}
            value={stats?.roleCounts.VERIFIER ?? 0}
            description={t("stats.verifiersDescription")}
            color="teal"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <AddUserForm />
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {tableHeads.map((head, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {apiUsers.map((user, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 whitespace-nowrap">{user.firstName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.lastName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.phoneNumber}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === "ADMIN"
                        ? "bg-orange-100 text-orange-800"
                        : user.role === "PASSENGER"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-blue-100 text-blue-800"
                    }`}>
                      {getRoleTranslation(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap capitalize">{user.nationality}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <ActionButton />
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}