
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';

export const BookAppointment = () => {

  return (
    <>
      <Header></Header>
      <main className="py-6 md:px-10 px-5">
            <h1 className='text-lg font-semibold'>Book an Appoinment</h1>

            <div className="my-20 grid gap-4">
                <div className='w-full'>
                    <input className='w-full py-2 border-b border-black outline-none' type="email" placeholder='Email'/>
                </div>
                <div className='w-full'>
                    <input className='w-full py-2 border-b border-black outline-none' type="text" placeholder='Company Name'/>
                </div>
                <div className='w-full'>
                    <textarea className='w-full py-2 border-b border-black outline-none resize-y' rows='4' type="email" placeholder='Your Query'></textarea>
                </div>
                <div className='w-full'>
                    <button className="bg-black py-4 md:px-24 w-full px-0 text-white font-bold rounded active:scale-[.99] transition-transform">Send Query</button>
                </div>
            </div>
      </main>
      <Footer></Footer>
    </>
  );
};
