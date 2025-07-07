"use client";

import React, { useState } from 'react';
import { useTranslations } from "next-intl";
import { Star, Shield, Clock, MapPin, Route, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatar from "@/public/images/avatar.png";
import Container from '@/components/ui/container';
import Map from "@/components/dashboard/map";
import Image from 'next/image';
import getStripe from "@/utils/get-stripejs";

const DEFAULT_CENTER: [number, number] = [-1.9499500, 30.0588500];

interface SeatStatus {
  id: string;
  status: 'available' | 'reserved' | 'selected';
  row: number;
  position: string;
}

const SeatSelectionPage: React.FC = () => {
  const t = useTranslations("schedule");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const initializeSeats = (): SeatStatus[] => {
    const seats: SeatStatus[] = [];
    const positions = ['A', 'B', 'C', 'D', 'E', 'F'];
    const reservedSeats = ['3C', '3D', '7A', '8E', '9B'];

    for (let row = 1; row <= 10; row++) {
      for (const pos of positions) {
        const seatId = `${row}${pos}`;
        seats.push({
          id: seatId,
          status: reservedSeats.includes(seatId) ? 'reserved' : 'available',
          row,
          position: pos
        });
      }
    }
    return seats;
  };

  const [seats, setSeats] = useState<SeatStatus[]>(initializeSeats());

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'reserved') return;

    setSeats(prevSeats =>
      prevSeats.map(s => {
        if (s.id === seatId) {
          const newStatus = s.status === 'selected' ? 'available' : 'selected';
          return { ...s, status: newStatus };
        }
        return s;
      })
    );

    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    );
  };

  const getSeatClassName = (status: string) => {
    const baseClasses = 'w-9 h-9 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg relative';
    switch (status) {
      case 'reserved':
        return `${baseClasses} bg-gray-400 border-gray-500 cursor-not-allowed opacity-70`;
      case 'selected':
        return `${baseClasses} bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-600 shadow-lg ring-2 ring-yellow-300`;
      default:
        return `${baseClasses} bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50`;
    }
  };

  const totalPrice = selectedSeats.length * 2500;


  const handleBooking = async () => {
    if (selectedSeats.length === 0) return;

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedSeats,
          totalPrice,
        }),
      });


      const { sessionId } = await response.json();

      const stripe = await getStripe();

      // @ts-expect-error stripe.redirectToCheckout is not typed
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="overflow-hidden bg-[#0B3B2E] text-white py-20 pt-38 sm:px-6 lg:px-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-6 leading-tight">
              {t("hero.title")} <span className="text-lime-300">{t("hero.titleHighlight")}</span>
            </h1>
            <p className="mb-8 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-green-100">
                <Shield className="w-5 h-5 text-lime-300" />
                <span>{t("hero.features.secure")}</span>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <Star className="w-5 h-5 text-lime-300" />
                <span>{t("hero.features.premium")}</span>
              </div>
              <div className="flex items-center gap-2 text-green-100">
                <Clock className="w-5 h-5 text-lime-300" />
                <span>{t("hero.features.support")}</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="p-6">
        <Container>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("seatSelection.title")}</h2>
                  <p className="text-gray-600">{t("seatSelection.subtitle")}</p>
                </div>

                <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-400 border border-gray-500 rounded-lg opacity-70"></div>
                    <span className="text-sm font-medium text-gray-700">{t("seatSelection.legend.reserved")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-white to-gray-50 border-2 border-gray-300 rounded-lg"></div>
                    <span className="text-sm font-medium text-gray-700">{t("seatSelection.legend.available")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-500 border border-yellow-600 rounded-lg"></div>
                    <span className="text-sm font-medium text-gray-700">{t("seatSelection.legend.selected")}</span>
                  </div>
                </div>

                <div className="relative bg-gradient-to-b from-blue-50 to-white p-6 rounded-2xl border-2 border-dashed border-blue-200">
                  <div className="flex justify-center mb-6">
                    <div className="bg-gradient-to-r from-green-300 to-green-700 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
                      <Route className="w-6 h-6" />
                      <span className="font-semibold">{t("seatSelection.cockpit")}</span>
                    </div>
                  </div>

                  <div className="grid grid-rows-10 gap-3 max-w-md mx-auto">
                    {Array.from({ length: 10 }, (_, rowIndex) => (
                      <div key={rowIndex} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                          {rowIndex + 1}
                        </div>
                        <div className="flex gap-2">
                          {['A', 'B', 'C'].map(pos => {
                            const seatId = `${rowIndex + 1}${pos}`;
                            const seat = seats.find(s => s.id === seatId);
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                className={getSeatClassName(seat?.status || 'available')}
                                title={`${t("seatSelection.seat")} ${seatId}`}
                              >
                                <span className="text-xs font-medium text-gray-600">
                                  {pos}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        <div className="w-12 flex justify-center">
                          <div className="w-px h-6 bg-green-200"></div>
                        </div>
                        <div className="flex gap-2">
                          {['D', 'E', 'F'].map(pos => {
                            const seatId = `${rowIndex + 1}${pos}`;
                            const seat = seats.find(s => s.id === seatId);
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                className={getSeatClassName(seat?.status || 'available')}
                                title={`${t("seatSelection.seat")} ${seatId}`}
                              >
                                <span className="text-xs font-medium text-gray-600">
                                  {pos}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 ">
                <div className="bg-white rounded-2xl shadow-sm  p-6 border border-gray-100 sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <span className="text-xl font-bold text-gray-800">{t("busInfo.busNumber")}</span>
                    <span className="bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {t("booking.active")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center">
                      <Image
                        src={avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{t("busInfo.driver")}</p>
                      <p className="text-sm text-gray-500">{t("busInfo.driverPhone")}</p>
                    </div>
                  </div>


                  <div className="flex items-center justify-between text-sm p-3 rounded-lg">
                    <div className='flex gap-2 border border-dashed border-green-300 p-2'>
                      <Bus />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{t("busInfo.totalSeats")}</p>
                        <p>50</p>
                      </div>
                    </div>


                    <div className='flex gap-2  border border-dashed border-lime-300 p-2'>
                      <Bus />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{t("busInfo.availableSeats")}</p>
                        <p>5</p>
                      </div>
                    </div>
                  </div>


                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">50</div>
                        <div className="text-xs text-gray-500">{t("busInfo.seats")}</div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-blue-300 to-purple-300"></div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">4</div>
                        <div className="text-xs text-gray-500">{t("busInfo.hours")}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <p className="font-bold text-gray-800">{t("busInfo.route")}</p>
                    </div>
                    <p className="text-sm text-gray-600">{t("busInfo.departure")} {t("busInfo.departureTime")} • {t("busInfo.arrival")} {t("busInfo.arrivalTime")}</p>
                  </div>

                  <div className="border border-gray-200 flex justify-center items-center h-full relative z-1 mt-6">
                    <Map width={300} height={200} center={DEFAULT_CENTER} zoom={6} className="rounded-lg" />
                  </div>

                  <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t("booking.pricePerSeat")}</span>
                      <span className="font-bold text-lg">2,500 {t("booking.currency")}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t("booking.selectedSeats")}</span>
                      <span className="font-bold text-lg text-green-600">{selectedSeats.length}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold border-t pt-3 border-gray-200">
                      <span className="text-gray-800">{t("booking.total")}</span>
                      <span className="text-green-600">{totalPrice.toLocaleString()} {t("booking.currency")}</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform ${selectedSeats.length > 0
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:scale-105 shadow-xl hover:shadow-2xl'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    disabled={selectedSeats.length === 0}
                  >
                    {t("booking.bookButton")}
                  </Button>

                  {selectedSeats.length > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500">
                        {t("booking.selected")} {selectedSeats.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SeatSelectionPage;