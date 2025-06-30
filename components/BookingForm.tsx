"use client";

import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Users, User, Mail, Phone } from "lucide-react";
import { useGlobal } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

interface GuestData {
  name: string;
  email: string;
  phone: string;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
  guestData?: GuestData[];
}

const BookingForm: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
    guestData: [
      {
        name: "",
        email: "",
        phone: "",
      },
    ],
  });

  const router = useRouter();

  const { bookProperty } = useGlobal();

  const updateGuest = (idx: number, field: keyof GuestData, value: string) => {
    setBookingData((prev) => {
      const guestData = [...(prev.guestData ?? [])];
      guestData[idx] = { ...guestData[idx], [field]: value };
      return { ...prev, guestData };
    });
  };

  const handleInputChange = (
    field: keyof BookingData,
    value: string | number
  ) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://gouninest-app-service-829497711371.asia-south1.run.app/api/v1/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: bookProperty?._id,
            roomType: bookProperty?.roomType,
            guests: bookingData.guests,
            moveInDate: bookingData.checkIn,
            totalPrice: bookProperty?.price || 0,
          }),
        }
      );
      const responseJson = await response.json();
        try {
          const paymentRes = await fetch(
            "https://gouninest-app-service-829497711371.asia-south1.run.app/api/v1/payments/create-order",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookingId: responseJson.booking._id,
                amount: bookProperty?.price || 0,
              }),
            }
          );
          const payment = await paymentRes.json();
          if (payment && payment.approvalUrl) {
            router.push(payment.approvalUrl);
          }
        } catch (error) {
          console.error("Error while booking:", error);
          alert("An error occurred while processing your booking. Please try again.");
        }
      }catch (error) {
        console.error("Error while booking:", error);
        alert("An error occurred while processing your booking. Please try again.");
      }
  };

  useEffect(() => {
    if (bookingData.guests > 1) {
      setBookingData((prev) => ({
        ...prev,
        guestData: Array.from({ length: bookingData.guests }, (_, idx) => ({
          name: prev.guestData?.[idx]?.name || "",
          email: prev.guestData?.[idx]?.email || "",
          phone: prev.guestData?.[idx]?.phone || "",
        })),
      }));
    }
  }, [bookingData.guests]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Book Your Perfect Stay
          </h1>
          <p className="text-gray-600">Book amazing accommodations worldwide</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold text-gray-600 mb-2">
                    <MapPin className="inline w-4 h-4 mr-2 text-blue-500" />
                    Selected Property
                  </label>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="font-semibold text-gray-800">
                      {bookProperty?.title}
                    </div>
                    <div className="text-gray-600 text-sm">
                      ${bookProperty?.price}/night (★ {bookProperty?.ratings})
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:justify-between gap-4 ">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) =>
                        handleInputChange("checkIn", e.target.value)
                      }
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring--[var(--color-electric-400)] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) =>
                        handleInputChange("checkOut", e.target.value)
                      }
                      min={
                        bookingData.checkIn ||
                        new Date().toISOString().split("T")[0]
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-electric-400)] focus:border-transparent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline w-4 h-4 mr-2" />
                      Number of Guests
                    </label>
                    <select
                      value={bookingData.guests}
                      onChange={(e) =>
                        handleInputChange("guests", parseInt(e.target.value))
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-electric-400)] focus:border-transparent"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Guest Information
                </h2>

                {(bookingData.guestData ?? []).map((guest, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row md:justify-between gap-4 mb-4"
                  >
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Full Name{" "}
                        {bookingData.guests > 1 ? `(Guest ${idx + 1})` : ""}
                      </label>
                      <input
                        type="text"
                        value={guest.name}
                        onChange={(e) =>
                          updateGuest(idx, "name", e.target.value)
                        }
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-electric-400)] focus:border-transparent"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email Address{" "}
                        {bookingData.guests > 1 ? `(Guest ${idx + 1})` : ""}
                      </label>
                      <input
                        type="email"
                        value={guest.email}
                        onChange={(e) =>
                          updateGuest(idx, "email", e.target.value)
                        }
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-electric-400)] focus:border-transparent"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone Number{" "}
                        {bookingData.guests > 1 ? `(Guest ${idx + 1})` : ""}
                      </label>
                      <input
                        type="tel"
                        value={guest.phone}
                        onChange={(e) =>
                          updateGuest(idx, "phone", e.target.value)
                        }
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-electric-400)] focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-[var(--color-electric-500)] hover:from-green-600 hover:to-[var(--color-electric-600)] text-white rounded-lg font-medium transition-all duration-300"
              >
                Complete Booking / Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
