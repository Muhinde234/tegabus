"use client";

import { useTranslations } from "next-intl";
import ActionButton from "@/components/dashboard/ActionButton";
import StatsCard from "@/components/dashboard/statCard";
import Topsection from "@/components/dashboard/topsection";
import { AddUserForm } from "@/components/dialogs/addUser";
import { useState, useEffect } from "react";

type User = {
  firstName: string;
  lastName: string;
  phone: string;
  role: "Admin" | "User" | "Verifier";
  country: string;
};

const generatePhoneNumber = () => `+250${Math.floor(10000000 + Math.random() * 90000000)}`;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    passengers: 30,
    managers: 20,
    administrators: 1,
    verifiers: 2,
  });

  const t = useTranslations("users");

  const tableHeads = [
    t("table.firstName"),
    t("table.lastName"),
    t("table.phone"),
    t("table.role"),
    t("table.country"),
    t("table.actions"),
  ];

  useEffect(() => {

    const roles: Array<"Admin" | "User" | "Verifier"> = ["Admin", "User", "Verifier"];
    const countries = ["Rwanda", "Tanzania", "Uganda", "Burundi", "Kenya", "Rwanda"];

    const sampleUsers = Array.from({ length: 20 }, (_, i) => ({
      firstName: `User${i + 1}`,
      lastName: `Last${i + 1}`,
      phone: generatePhoneNumber(),
      role: roles[i % roles.length],
      country: countries[i % countries.length]
    }));

    setUsers(sampleUsers);
    setStats(prev => ({
      ...prev,
      administrators: prev.administrators + sampleUsers.filter(u => u.role === "Admin").length,
      verifiers: prev.verifiers + sampleUsers.filter(u => u.role === "Verifier").length
    }));
  }, []);

  const handleAddUser = (newUser: User) => {
    setUsers(prevUsers => [...prevUsers, {
      ...newUser,
      phone: generatePhoneNumber()
    }]);

    setStats(prev => {
      const updatedStats = { ...prev };
      switch (newUser.role) {
        case "Admin":
          updatedStats.administrators += 1;
          break;
        case "User":
          updatedStats.passengers += 1;
          break;
        case "Verifier":
          updatedStats.verifiers += 1;
          break;
      }
      return updatedStats;
    });
  };

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
          value={stats.passengers}
          description={t("stats.passengersDescription")}
          color="green"
        />
        <StatsCard
          title={t("stats.managers")}
          value={stats.managers}
          description={t("stats.managersDescription")}
          color="blue"
        />
        <StatsCard
          title={t("stats.administrator")}
          value={stats.administrators}
          description={t("stats.administratorDescription")}
          color="orange"
        />
        <StatsCard
          title={t("stats.verifiers")}
          value={stats.verifiers}
          description={t("stats.verifiersDescription")}
          color="teal"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <AddUserForm onAddUser={handleAddUser} />
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
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="py-4 px-6 whitespace-nowrap">{user.firstName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.lastName}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.phone}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${user.role === "Admin"
                        ? "bg-orange-100 text-orange-800"
                        : user.role === "Verifier"
                          ? "bg-teal-100 text-teal-800"
                          : "bg-blue-100 text-blue-800"
                      }`}>
                      {getRoleTranslation(user.role)}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{user.country}</td>
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