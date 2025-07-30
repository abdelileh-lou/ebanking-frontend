import React from "react";
import { Facebook, Twitter, Linkedin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 shadow-t border-t w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 items-start">
        {/* Company Info */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">eBank</h2>
          <p className="text-sm">
            Secure. Reliable. Modern banking built for your future. Join us and
            experience seamless financial services.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Accounts
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Loans
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm ml-24">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gray-600" />
              <span>support@ebank.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gray-600" />
              <span>+213 555 123 456</span>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 items-center ml-24">
            <a href="#" aria-label="Facebook">
              <Facebook size={20} className="hover:text-blue-500" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} className="hover:text-blue-400" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <Linkedin size={20} className="hover:text-blue-700" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} eBank. All rights reserved.
      </div>
    </footer>
  );
}
