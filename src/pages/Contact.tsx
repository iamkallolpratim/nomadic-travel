import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Get in touch with us for any queries about our tours or to start
            planning your perfect Assam adventure.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:mt-24 lg:max-w-none lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Contact Information
              </h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center gap-x-3">
                  <dt>
                    <Phone
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href="tel:+919876543210"
                      className="text-base text-gray-900 hover:text-green-600"
                    >
                      +91 6000060220
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-x-3">
                  <dt>
                    <Mail
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href="mailto:nomadictravel.zeemi@gmail.com"
                      className="text-base text-gray-900 hover:text-green-600"
                    >
                      nomadictravel.zeemi@gmail.com
                    </a>
                  </dd>
                </div>
                <div className="flex items-center gap-x-3">
                  <dt>
                    <MapPin
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd className="text-base text-gray-900">
                    House No 72, Senduri Ali, Jonali, Guwahati , Assam, 781024
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="space-y-6">
            <iframe
              height={"1200px"}
              style={{
                width: "100%",
              }}
              src="https://docs.google.com/forms/d/e/1FAIpQLSdNpOFj40o9qX5vozZdMjl698Z-oLsGCcLIqXjenTxHPAVFeQ/viewform?embedded=true"
            >
              Loading…
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
