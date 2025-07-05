
"use client";

import { useState, useEffect } from "react";
import { getGreeting } from "@/utils/getGreeting";

export function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  return (
    <h1 className="text-xl font-semibold text-gray-800 mb-4">
      {greeting}, welcome back!
    </h1>
  );
}