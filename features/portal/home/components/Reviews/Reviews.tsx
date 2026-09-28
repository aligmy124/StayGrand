"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
} from "lucide-react";

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Ali Gamal",
      location: "New York, USA",
      avatar: "/images/myGamal.jpg",
      rating: 5,
      date: "March 2024",
      comment:
        "Absolutely incredible experience! The hotel exceeded all my expectations. The staff was incredibly welcoming and the views were breathtaking. I can't wait to come back!",
      hotel: "The Aveline",
      image: "/images/hero2.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "London, UK",
      avatar: "/images/px1.jpg",
      rating: 5,
      date: "February 2024",
      comment:
        "One of the best stays I've ever had. The attention to detail in every aspect of the service was remarkable. The room was spacious, clean, and beautifully decorated.",
      hotel: "Grand Heritage",
      image: "/images/swp1.png",
    },
    {
      id: 3,
      name: "Martn Williams",
      location: "Sydney, Australia",
      avatar: "/images/px3.jpg",
      rating: 4,
      date: "January 2024",
      comment:
        "Beautiful property with stunning ocean views. The location was perfect for exploring the city. The staff went above and beyond to make our stay memorable.",
      hotel: "Ocean Vista",
      image: "/images/swp2.png",
    },
    {
      id: 4,
      name: "David Rodriguez",
      location: "Madrid, Spain",
      avatar: "/images/px4.jpg",
      rating: 5,
      date: "December 2023",
      comment:
        "Exceptional service and luxurious accommodations. Every detail was carefully considered. The food was amazing and the spa treatments were world-class.",
      hotel: "Mountain Lodge",
      image: "/images/swp3.png",
    },
    {
      id: 5,
      name: "Alex Thompson",
      location: "Toronto, Canada",
      avatar: "/images/px2.jpg",
      rating: 5,
      date: "November 2023",
      comment:
        "A hidden gem! The ambiance was perfect for a romantic getaway. The rooms were elegantly designed and the sunset views from the terrace were unforgettable.",
      hotel: "The Aveline",
      image: "/images/swp4.png",
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 6000);

    return () => clearInterval(timer);
  });

  const currentReview = reviews[currentIndex];

  return (
    <section id="#reviews" className="relative overflow-hidden bg-[#F7F8F5] px-4 py-10 sm:px-6 lg:px-8 lg:py-28">

      {/* Background Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-[#4E604F]/[0.06] blur-[120px]" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#4E604F]/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">

        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#4E604F]/30" />

            <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#4E604F]">
              Guest Experiences
            </span>

            <span className="h-px w-10 bg-[#4E604F]/30" />
          </div>

          <h2 className="font-heading text-3xl font-semibold tracking-tight text-[#263126] sm:text-4xl lg:text-5xl">
            Stories From Our Guests
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#434842]/60 sm:text-base">
            Discover what makes every stay with StayGrand truly memorable.
          </p>
        </div>

        {/* Review Card */}
        <div className="relative overflow-hidden rounded-[2rem] border border-[#4E604F]/10 bg-white shadow-[0_25px_80px_-30px_rgba(38,49,38,0.25)]">

          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">

            {/* Image */}
            <div className="relative min-h-[360px] overflow-hidden sm:min-h-[440px] lg:min-h-[560px]">

              <Image
                src={currentReview.image}
                alt={currentReview.hotel}
                fill
                priority
                className="object-cover transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#182119]/75 via-[#182119]/10 to-transparent" />

              {/* Property Info */}
              <div className="absolute bottom-8 left-8 right-8 text-white sm:bottom-10 sm:left-10">

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/70">
                  Featured Property
                </span>

                <h3 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
                  {currentReview.hotel}
                </h3>

              </div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-between p-8 sm:p-10 lg:p-14">

              {/* Decorative Quote */}
              <div>
                <Quote
                  className="mb-8 h-10 w-10 text-[#4E604F]/15"
                  strokeWidth={1.5}
                />

                {/* Rating */}
                <div className="mb-7 flex items-center gap-1">

                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-4 w-4 ${
                        index < currentReview.rating
                          ? "fill-[#B08D57] text-[#B08D57]"
                          : "text-[#D9DED8]"
                      }`}
                      strokeWidth={1.5}
                    />
                  ))}

                  <span className="ml-3 text-xs tracking-wide text-[#434842]/45">
                    {currentReview.date}
                  </span>
                </div>

                {/* Review */}
                <blockquote className="font-heading text-xl leading-[1.7] text-[#263126] sm:text-2xl">
                  “{currentReview.comment}”
                </blockquote>
              </div>

              {/* User */}
              <div className="mt-12 border-t border-[#4E604F]/10 pt-7">

                <div className="flex items-center gap-4">

                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-[#4E604F]/15 ring-offset-4">
                    <Image
                      src={currentReview.avatar}
                      alt={currentReview.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-[#263126]">
                      {currentReview.name}
                    </h4>

                    <p className="mt-0.5 text-xs text-[#434842]/50">
                      {currentReview.location}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-7 right-7 flex gap-2">

            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#263126] shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#4E604F] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-[#263126] shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[#4E604F] hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-center gap-2">

          {reviews.map((review, index) => (
            <button
              key={review.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to review ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "w-10 bg-[#4E604F]"
                  : "w-1.5 bg-[#4E604F]/20 hover:bg-[#4E604F]/40"
              }`}
            />
          ))}

        </div>

      </div>
    </section>
  );
}