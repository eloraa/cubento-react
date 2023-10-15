import { useNavigate, useParams } from 'react-router-dom';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { useContext, useRef, useState } from 'react';
import { DataContext } from '../Root';
import { SketchCanvas } from '../shared/Sketch';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../utils/createPaymentIntent';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/authProviders';
import { DatabaseContext } from '../providers/databaseProvider';

export const Payment = () => {
  const params = useParams();
  const { data } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const { writeData, databaseData } = useContext(DatabaseContext);
  const event = data.find(e => e.id === params.id);
  const [el, setEl] = useState({});
  const sketchRef = useRef(null);
  const navigate = useNavigate()

  const readImageData = e => {
    const img = e.target;
    if (!img?.width) return;

    const blockSize = 5;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext && canvas.getContext('2d');

    if (!context) return { r: 0, g: 0, b: 0 };

    const height = (canvas.height = img.naturalHeight || img.offsetHeight || img.height);
    const width = (canvas.width = img.naturalWidth || img.offsetWidth || img.width);

    context.drawImage(img, 0, 0);

    let count = 0;
    let rgb = { r: 0, g: 0, b: 0 };

    try {
      const data = context.getImageData(0, 0, width, height).data;
      for (let i = 0; i < data.length; i += blockSize * 4) {
        count++;
        rgb.r += data[i];
        rgb.g += data[i + 1];
        rgb.b += data[i + 2];
      }
    } catch (e) {
      return { r: 0, g: 0, b: 0 };
    }

    rgb = {
      r: Math.min(255, Math.max(0, Math.round(rgb.r / count))),
      g: Math.min(255, Math.max(0, Math.round(rgb.g / count))),
      b: Math.min(255, Math.max(0, Math.round(rgb.b / count))),
    };

    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    let hue = 0;

    if (max === r) hue = ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60;
    else if (max === g) hue = ((b - r) / (max - min) + 2) * 60;
    else hue = ((r - g) / (max - min) + 4) * 60;

    if (hue < 0) hue += 360;
    if(isNaN(hue)) hue = 0
    setEl({ ...el, hue: hue / 360 });
  };

  const stripe = useStripe();
  const elements = useElements();

  let isProccessing;
  const handlePayment = async (e) => {

    // We don't want to let default form submission happen here,
    // which would refresh the page.
    e.preventDefault();
    if(isProccessing) return
    if(databaseData.filter(e => e.eventID === event.id).length) {
      toast('You have already booked this Event.')
      return
    }

    if(!e.target.name.value || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.email.value)) return

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    isProccessing = true
    const {error, clientSecret} = await createPaymentIntent('card', 'usd', e.target.email.value, event.price * 100)

    // const {error: backendError, clientSecret} = await fetch(
    //   '/create-payment-intent',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       paymentMethodType: 'card',
    //       currency: 'usd',
    //     }),
    //   }
    // ).then((r) => r.json());


    if (error) {
      isProccessing = false
      return;
    }


    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: e.target.name.value,
            email: e.target.email.value,
          },
        },
      }
    );

    if (stripeError) {
      // Show error to your customer (e.g., insufficient funds)
      isProccessing = false
      toast(stripeError.message);
      return;
    }

    // Show a success message to your customer
    // There's a risk of the customer closing the window before callback
    // execution. Set up a webhook or plugin to listen for the
    // payment_intent.succeeded event that handles any business critical
    // post-payment actions.
    toast(`Payment ${paymentIntent.status}`);

    const err = writeData(e.target.name.value, e.target.email.value, paymentIntent.id, event.id, user.uid)
    if(!err) navigate('/booked')
  };

  return (
    <>
      <Header></Header>
      <main className="py-6 md:px-10 px-5 mt-8 grid xl:grid-cols-2 gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mb-8 border-b pb-8">
            <figure className="mb-6 overflow-hidden rounded relative max-w-xs">
              <img crossOrigin="anonymous" onLoad={readImageData} className="w-full object-contain rounded" src={event.cover} alt="" />
            </figure>
            <h1>{event.name}</h1>
            <h4 className="mt-1 font-bold text-sm">${event.price}</h4>
            <p className="text-sm mt-14 max-w-xs">
              By booking this event you&apos;re agreeing to our{' '}
              <a href="#" className="font-semibold">
                Terms of Service
              </a>
            </p>
          </div>
          <div>
            <h1 className="border-b border-[#ddd] pb-2">Your payment Details</h1>

            <form onSubmit={handlePayment} className="mt-8 text-sm grid gap-2">
              <div className="w-full">
                <input className="w-full py-4 outline-none border-b border-black" type="text" name="name" placeholder="Name" required />
              </div>
              <div htmlFor="email" className="w-full">
                <input className="w-full py-4 outline-none border-b border-black" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="w-full">
                <div className="w-full py-4 outline-none border-b border-black">
                  <CardElement style={{ base: { '::placeholder': { fontWeight: 'normal', fontSize: '.975rem' } }, invalid: { iconColor: '#FF1F00' } }}></CardElement>
                </div>
              </div>
              <div className="w-full">
                <button className="bg-black py-3 w-full px-0 mt-6 text-white font-bold rounded active:scale-[.99] transition-transform">Payment</button>
              </div>
            </form>
            <h4 className="text-sm mt-8">
              You can use this example card number: <span className="font-medium">4242 4242 4242 4242</span>
            </h4>
          </div>
        </div>
        <div className="max-xl:hidden" ref={sketchRef}>
          {(el.hue || el.hue === 0) && <SketchCanvas el={{...el, parent: sketchRef.current}}></SketchCanvas>}
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};
