import Navbar from "./../components/Navbar";
import Footer from "./../components/Footer";
import Header from "./../components/home/Header";
import FeaturesSection from "./../components/home/FeaturesSection";

import Testimonial from "./../components/home/Testimonial";

import Conversation from "@/components/home/Conversation";
import Upcoming from "@/components/home/Upcoming";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header/>
      <FeaturesSection/>
      <Upcoming />
      <Conversation />
      <Testimonial/>
      <Footer />
    </div>
  );
}
