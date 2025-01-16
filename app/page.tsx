import Navbar from "@/components/Navbar";
import Footer from "./../components/Footer";
import Header from "./../components/home/Header";
import FeaturesSection from "./../components/home/FeaturesSection";
import Testimonial from "./../components/home/Testimonial";
import Conversation from "@/components/home/Conversation";
import Upcoming from "@/components/home/Upcoming";
import CustomerHub from "@/components/home/CustomerHub";

import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <FeaturesSection />
      <Upcoming />
      <Conversation />
      <CustomerHub />
      <Testimonial />
      <Footer />
    </div>
  );
}
