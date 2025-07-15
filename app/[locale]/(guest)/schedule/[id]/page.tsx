"use client";

import React, {useMemo, useState} from 'react';
import { useTranslations } from "next-intl";
import { Star, Shield, Clock, MapPin, Route, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import avatar from "@/public/images/avatar.png";
import Container from '@/components/ui/container';
import Map from "@/components/dashboard/map";
import Image from 'next/image';
import getStripe from "@/utils/get-stripejs";
import {useScheduleSeats} from "@/hooks/useSchedule";
import {useParams} from "next/navigation";
import Loader from "@/components/ui/loader";
import {formatTimeOnly} from "@/lib/utils";

const DEFAULT_CENTER: [number, number] = [-1.9499500, 30.0588500];

const SeatSelectionPage: React.FC = () => {
  const t = useTranslations("schedule");

  const params = useParams();
  const id = Number(params?.id);
  const { data, isLoading } = useScheduleSeats(id);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatNumber: string) => {
    const seat = data?.seats.find(s => s.seatNumber === seatNumber);
    if (!seat || seat.booked) return;

    setSelectedSeats(prev =>
        prev.includes(seatNumber)
            ? prev.filter(id => id !== seatNumber)
            : [...prev, seatNumber]
    );
  };

  const getSeatClassName = (seatNumber: string) => {
    const seat = data?.seats.find(s => s.seatNumber === seatNumber);
    const baseClasses = 'w-9 h-9 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg relative';
    if (!seat) return baseClasses;
    if (seat.booked) {
      return `${baseClasses} bg-gray-400 border-gray-500 cursor-not-allowed opacity-70`;
    }
    if (selectedSeats.includes(seatNumber)) {
      return `${baseClasses} bg-gradient-to-br from-yellow-400 to-yellow-500 border-yellow-600 shadow-lg ring-2 ring-yellow-300`;
    }
    return `${baseClasses} bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-blue-400 hover:bg-blue-50`;
  };

  const groupedSeats = useMemo(() => {
    if (!data) return {};

    const groups: Record<string, string[]> = {};
    data.seats.forEach(seat => {
      const letter = seat.seatNumber.charAt(0);
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(seat.seatNumber);
    });

    Object.keys(groups).forEach(letter => {
      groups[letter].sort((a, b) => {
        const numA = parseInt(a.slice(1));
        const numB = parseInt(b.slice(1));
        return numA - numB;
      });
    });

    return groups;
  }, [data]);

  const totalPrice = selectedSeats.length * (data?.pricePerSeat || 0);


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

  if (isLoading || !data) {
    return <Loader />;
  }

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

                  <div className="grid grid-cols-5 max-w-md mx-auto gap-3 items-end">
                    {Object.entries(groupedSeats).map(([letter, seatNumbers]) => (
                        <div key={letter} className="flex flex-col items-center gap-2 justify-end">
                          <span className="font-bold">{letter}</span>
                          {seatNumbers.map(seatNumber => (
                              <button
                                  key={seatNumber}
                                  onClick={() => handleSeatClick(seatNumber)}
                                  className={getSeatClassName(seatNumber)}
                                  title={`${t("seatSelection.seat")} ${seatNumber}`}
                              >
                                <span className="text-xs text-gray-600 font-medium">{seatNumber.slice(1)}</span>
                              </button>
                          ))}
                        </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 ">
                <div className="bg-white rounded-2xl shadow-sm  p-6 border border-gray-100 sticky top-6">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <span className="text-xl font-bold text-gray-800">{data.bus}</span>
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
                      <p className="font-bold text-gray-800">{data.driverName || "No Name"}</p>
                      <p className="text-sm text-gray-500">{data.driverPhone || "No Phone"}</p>
                    </div>
                  </div>


                  <div className="flex items-center justify-between text-sm p-3 rounded-lg">
                    <div className='flex gap-2 border border-dashed border-green-300 p-2'>
                      <Bus />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{t("busInfo.totalSeats")}</p>
                        <p>{data.totalSeats}</p>
                      </div>
                    </div>


                    <div className='flex gap-2  border border-dashed border-lime-300 p-2'>
                      <Bus />
                      <div className='flex flex-col'>
                        <p className='text-sm'>{t("busInfo.availableSeats")}</p>
                        <p>{data.remainingSeats}</p>
                      </div>
                    </div>
                  </div>


                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{data.totalSeats}</div>
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
                      <p className="font-bold text-gray-800">{data.from + " → "+ data.to}</p>
                    </div>
                    <p className="text-sm text-gray-600">{t("busInfo.departure")} {formatTimeOnly(data.departureTime)} • {t("busInfo.arrival")} {formatTimeOnly(data.arrivalTime)}</p>
                  </div>

                  <div className="border border-gray-200 flex justify-center items-center h-full relative z-1 mt-6">
                    <Map width={300} height={200} center={DEFAULT_CENTER} zoom={6} className="rounded-lg" />
                  </div>

                  <div className="space-y-3 mb-6 p-4 bg-gray-50 rounded-xl mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">{t("booking.pricePerSeat")}</span>
                      <span className="font-bold text-lg">{data.pricePerSeat} {t("booking.currency")}</span>
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