import { useContext, useEffect } from 'react';
import { Banner } from '../shared/Banner';
import { Header } from '../shared/Header';
import { DataContext } from '../Root';
import { EventCard } from '../shared/EventCard';
import { WhyChooseUsVector } from '../utils/SvgIcon';
import { Footer } from '../shared/Footer';

import AOS from 'aos';
import 'aos/dist/aos.css';

export const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { data } = useContext(DataContext);
  return (
    <>
      <Header></Header>
      <Banner></Banner>

      <main className="py-6 md:px-10 px-5 mt-28">
        <div className="mb-16" data-scroll>
          <h1 className="text-2xl mb-1">
            Experience <span className="font-bold text-red">Excellence</span>
          </h1>
          <h4>Our Services</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-16" data-aos="fade-up">
          {data.map(ev => (
            <EventCard event={ev} key={ev.id} />
          ))}
        </div>

        <div className="my-28 grid grid-cols-1 md:grid-cols-2 gap-x-8" data-aos="fade-up">
          <div>
            <h1>
              <WhyChooseUsVector></WhyChooseUsVector>
            </h1>
            <h2 className="text-xl leading-10">
              Cubento is a pioneering Bangladeshi event management company, renowned for orchestrating extraordinary entertainment experiences worldwide. We&apos;re dedicated to connecting imaginative
              souls, fostering a global collective of culture, and crafting unforgettable moments
            </h2>
          </div>
          <div className="bg-cover bg-center min-h-[120px]" style={{ backgroundImage: 'url(/why-choose-us-compressed.png)' }}></div>
        </div>

        <div className="my-16" data-aos="fade-up">
          <h1 className="text-2xl mb-1">
            Awesome International <span className="text-red font-bold">Collaboration</span>
          </h1>

          <div className="mt-16">
            <img className="w-full h-full" src="/companies.png" alt="" />
          </div>
        </div>

        <div className="my-28" data-aos="fade-up">
          <div className="flex justify-between flex-wrap gap-y-12">
            <div className="flex gap-12 flex-wrap">
              <div>
                <h4 className="text-red font-medium">Email</h4>
                <h2 className="font-bold mt-2">info@cubento.events</h2>
              </div>
              <div>
                <h4 className="text-red font-medium">Email</h4>
                <h2 className="font-bold mt-2">info@cubento.events</h2>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <h4 className="text-red font-medium md:text-right">Company</h4>
              <div className="flex gap-12 font-bold mt-2 w-full justify-between flex-wrap">
                <a href="#">About</a>
                <a href="#">Faq</a>
                <a href="#">Contact</a>
                <a href="#">Legal</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
};
