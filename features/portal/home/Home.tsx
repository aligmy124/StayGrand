import Hero from "./components/Hero/Hero";
import FeaturedHotels from "./components/FeaturedHotels/FeaturedHotels";
import Container from "@/Shared/Components/Container";
import Footer from "./components/Footer/Footer";
import Reviews from "./components/Reviews/Reviews";
import FeaturedAds from "./components/FeaturedDestination/FeaturedAds";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <Container>
        <FeaturedHotels />
        <FeaturedAds/>
        <Reviews/>
      </Container>
      <Footer/>
    </main>
    
  );
}