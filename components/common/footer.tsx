"use client";

import React, { useState } from "react";
import Container from "../ui/container";
import Input from "../ui/inputField";
import Button from "../ui/button";
import Link from "next/link";
import Logo from "./logo";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribe, setSubscribe] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const handleSubscribe = () => {
    if (!validateEmail(email)) {
      setError("Enter an email address like example@mysite.com.");
    } else {
      setError("");
      alert(`Subscribed: ${email}`);
      setEmail("");
      setSubscribe(false);
    }
  };

  return (
    <footer className="bg-[#0B3B2E] text-white mt-20">
      <Container className="pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Logo />
          </Link>
          <p>For our latest booking tips and tricks</p>
          <p>Subscribe below</p>

          <Input
            label="Email "
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@tegabus.com"
            error={error}
            className="border-b border-white"
          />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-2">
            <div className="w-4 h-4 border border-white flex items-center justify-center">
              <input
                type="checkbox"
                onChange={(e) => setSubscribe(e.target.checked)}
                id="newsletter"
                className="w-full h-full opacity-0 cursor-pointer peer"
              />
            </div>
            <span>
              Yes, subscribe me to your <br />
              newsletter
            </span>

            <Button onClick={handleSubscribe}>Send</Button>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <div className=" flex flex-col mt-4 gap-2 ">
            <Link href="/">Home</Link>
            <Link href="/">About Us</Link>
            <Link href="/">Routes</Link>
            <Link href="/">Terms & Conditions</Link>
          </div>
        </div>

        <div className="flex flex-col  mt-4">
          <h3 className="font-semibold text-lg">Socials</h3>
          <div className=" flex flex-col  gap-2  mt-4">
            <Link href="/">Instagram</Link>
            <Link href="/">WhatsApp</Link>
            <Link href="/">Facebook</Link>
            <Link href="/">Twitter</Link>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <h3 className="font-semibold text-lg">Contact</h3>
          <div className= " flex flex-col gap-2   mt-4">
            <Link href="/">+250780396766</Link>
            <Link href="/">support@tegabus.com</Link>
          </div>
        </div>
      </Container>

      <Container>
        <div className="text-center text-sm text-white py-6 border-t border-green-800">
          <p>© 2025 TegaBus. All rights reserved</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
