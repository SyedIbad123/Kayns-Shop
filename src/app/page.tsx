import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import DesignsIntro from "@/components/sections/DesignsIntro";
import Collection from "@/components/sections/Collection";
import BookingSteps from "@/components/sections/BookingSteps";
import HotProducts from "@/components/sections/HotProducts";
import Portfolio from "@/components/sections/Portfolio";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <DesignsIntro />
        <Collection />
        <BookingSteps />
        <HotProducts />
        <Portfolio />
      </main>
    </>
  );
}
