import { useContext } from 'react';
import { Footer } from '../shared/Footer';
import { Header } from '../shared/Header';
import { DatabaseContext } from '../providers/databaseProvider';
import { AuthContext } from '../providers/authProviders';
import { DataContext } from '../Root';
import { getDate } from '../utils/formatDate';
import {  pdf } from '@react-pdf/renderer';
import { Receipt } from '../shared/Receipt';
import { printPDF } from '../utils/utils';
import { toast } from 'react-toastify';

export const Booked = () => {
  const { databaseData, deleteData, setDatabaseData } = useContext(DatabaseContext);
  const { data } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const handlePrint = id => {
    let printableData = databaseData.find(e => e.eventID === id);

    printableData = {
      name: data.find(d => d.id === printableData.eventID).name,
      price: `$${data.find(d => d.id === printableData.eventID).price}`,
      email: printableData.email,
      paymentID: printableData.paymentID,
      date: getDate(printableData.date),
      locale: printableData.locale,
    };
    pdf(<Receipt data={printableData}></Receipt>).toBlob()
      .then(r => printPDF(r))
      .catch(() => toast('Something went wrong.'))
  };



  return (
    <>
      <Header></Header>
      <main className="py-6 md:px-10 px-5">
        {!databaseData.length ? (
          <h1 className="text-2xl mb-1 text-red">You haven&apos;t booked any event</h1>
        ) : (
          <>
            <div className="flex justify-between">
              <h1 className="text-2xl mb-1">
                Your booked <span className="font-bold text-red">Events</span>
              </h1>
              <button onClick={() => setDatabaseData([]) || deleteData(user.uid)} className="active:scale-[.99] transition-transform underline">
                Clear all booked Events
              </button>
            </div>
            <table className="w-full mt-20 mb-16 border-spacing-4 border-separate max-md:flex max-md:flex-col gap-4">
              <thead className="text-left text-sm font-normal mb-2 text-neutral-500 max-md:hidden">
                <tr>
                  <th className="font-normal py-4 pl-6">Name</th>
                  <th className="font-normal py-4 pl-6">Price</th>
                  <th className="font-normal py-4">Payment ID</th>
                  <th className="font-normal py-4">Email</th>
                  <th className="text-right font-normal py-4 pr-6">Action</th>
                </tr>
              </thead>
              {databaseData.map(e => (
                <tbody key={e.eventID} className="border border-[#ddd] text-sm">
                  <tr className="outline outline-1 outline-[#ddd] max-md:flex max-md:flex-wrap max-md:px-4">
                    <td className="py-4 pl-6 font-semibold max-md:w-full max-md:pl-0 max-md:pt-6">
                      <span className="max-md:block hidden text-neutral-400 mb-2">Name</span>
                      {data.find(d => d.id === e.eventID).name}
                    </td>
                    <td className="py-4 pl-6 max-md:w-full max-md:pl-0 max-md:py-2">
                      <span className="max-md:block hidden text-neutral-400 mb-2">Price</span>${data.find(d => d.id === e.eventID).price}
                    </td>
                    <td className="py-4 max-md:w-full max-md:py-2">
                      <span className="max-md:block hidden text-neutral-400 mb-2">Payment ID</span>
                      {e.paymentID}
                    </td>
                    <td className="py-4 max-md:w-full max-md:py-2">
                      <span className="max-md:block hidden text-neutral-400 mb-2">Email</span>
                      {e.email}
                    </td>
                    <td className="text-right py-4 pr-6 max-md:w-full max-md:text-center max-md:pr-0 max-md:pb-6 max-md:mt-4">
                      <button
                        onClick={() => handlePrint(e.eventID)}
                        className="font-semibold underline active:scale-[.99] transition-transform max-md:w-full max-md:no-underline max-md:bg-black max-md:py-3 max-md:text-white max-md:rounded"
                      >
                        Download Reciept
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </>
        )}

 
      </main>
      <Footer></Footer>
    </>
  );
};
