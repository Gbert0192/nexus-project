"use client";

import Image from "next/image";
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      {/* // <footer className="bg-gradient-to-r from-[#2c200d] via-[#4a3715] to-[#2c200d] text-gray-200"> */}
      {/* // <footer className="bg-gray-900/50"> */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/img/favicon.jpeg"
                  alt="Nexus Topup Logo"
                  width={50}
                  height={50}
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h1 className="text-2xl font-bold text-yellow-400">
                Nexus Topup
              </h1>
            </div>
            <p className="max-w-sm leading-relaxed text-gray-400">
              Platform top-up game online terpercaya dengan layanan cepat, aman,
              dan dukungan 24/7. Nikmati pengalaman gaming yang tak terbatas!
            </p>
          </div>

          <div>
            <h2 className="mb-4 inline-block border-b border-yellow-400 pb-2 text-lg font-semibold text-white">
              Menu Utama
            </h2>
            <ul className="space-y-3">
              {["Home", "Top-Up", "Promo", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-yellow-400"
                  >
                    <span className="mr-3 h-2 w-2 rounded-full bg-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="mb-4 inline-block border-b border-yellow-400 pb-2 text-lg font-semibold text-white">
              Bantuan
            </h2>
            <ul className="space-y-3">
              {[
                "FAQ",
                "Cara Top-Up",
                "Syarat & Ketentuan",
                "Kebijakan Privasi",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="group flex items-center text-gray-400 transition-colors duration-300 hover:text-yellow-400"
                  >
                    <span className="mr-3 h-2 w-2 rounded-full bg-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h2 className="mb-4 inline-block border-b border-yellow-400 pb-2 text-lg font-semibold text-white">
              Hubungi Kami
            </h2>

            {/* Contact Info */}
            <div className="mb-6 space-y-2">
              <p className="text-sm text-gray-400">📧 support@nexustopup.com</p>
              <p className="text-sm text-gray-400">📱 +62 812-3456-7890</p>
              <p className="text-sm text-gray-400">🕒 24/7 Customer Support</p>
            </div>

            {/* Social Media */}
            <div className="space-y-3">
              <p className="font-medium text-white">Follow Us:</p>
              <div className="flex space-x-4">
                {[
                  {
                    icon: FaFacebookF,
                    label: "Facebook",
                    color: "hover:bg-blue-600",
                  },
                  {
                    icon: FaTwitter,
                    label: "Twitter",
                    color: "hover:bg-blue-400",
                  },
                  {
                    icon: FaInstagram,
                    label: "Instagram",
                    color: "hover:bg-pink-500",
                  },
                  {
                    icon: FaDiscord,
                    label: "Discord",
                    color: "hover:bg-indigo-500",
                  },
                ].map(({ icon: Icon, label, color }) => (
                  <a
                    key={label}
                    href="#"
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-gray-400 transition-all duration-300 ${color} hover:scale-110 hover:text-white hover:shadow-lg`}
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-900/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; 2025 Nexus Topup. Semua hak dilindungi undang-undang.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="transition-colors hover:text-yellow-400">
                Privacy Policy
              </a>
              <span>•</span>
              <a href="#" className="transition-colors hover:text-yellow-400">
                Terms of Service
              </a>
              <span>•</span>
              <a href="#" className="transition-colors hover:text-yellow-400">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
