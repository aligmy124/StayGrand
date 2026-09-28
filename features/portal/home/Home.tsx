import React from "react";
import Hero from "./components/Hero/Hero";
import FeaturedHotels from "./components/FeaturedHotels/FeaturedHotels";
import PopularDestinations from "./components/PopularDestinations/PopularDestinations";
import Container from "@/Shared/Components/Container";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Container>
        <FeaturedHotels />
        {/* <PopularDestinations /> */}
        <Reviews/>
      </Container>
      <Footer/>
    </main>
    
  );
}