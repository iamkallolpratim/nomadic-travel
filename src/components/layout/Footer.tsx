import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  X,
  Youtube,
} from "lucide-react";
import Logo from "../../assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <h2 className="text-2xl font-bold text-green-500">
              <img src={Logo} alt="Nomadic Travel" className="w-20 h-auto" />
            </h2>
            <p className="mt-4 text-sm text-gray-300">
              Your gateway to experiencing the magnificent wildlife and culture
              of Assam. Specializing in Kaziranga National Park tours and
              authentic local experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {["Home", "About", "Packages", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-300 hover:text-green-500"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>
                  House No 72, Senduri Ali, Jonali, Guwahati , Assam, 781024
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Phone className="h-4 w-4" />
                <a href="tel:+916000060220">
                  <span>+91 6000060220</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4" />
                <span>nomadictravel.zeemi@gmail.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="mt-4 flex space-x-4">
              {[
                {
                  Icon: Facebook,
                  label: "Facebook",
                  url: "https://www.facebook.com/share/18Dxgm2LdM/",
                },
                { Icon: X, label: "X", url: "https://x.com/iamzeemi" },
                {
                  Icon: Instagram,
                  label: "Instagram",
                  url: "https://www.instagram.com/iamzeemi/",
                },
                {
                  Icon: Youtube,
                  label: "Youtube",
                  url: "https://www.youtube.com/@zeemiwalker",
                },
              ].map(({ Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  className="text-gray-300 hover:text-green-500"
                  aria-label={label}
                  target="_blank"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Nomadic Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
