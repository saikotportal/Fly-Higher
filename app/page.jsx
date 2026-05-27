import HeroSection from '@/components/home/HeroSection';
import PopularRoutes from '@/components/home/PopularRoutes';
import DestinationImages from '@/components/home/DestinationImages';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Testimonials from '@/components/home/Testimonials';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PopularRoutes />
      <DestinationImages />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
