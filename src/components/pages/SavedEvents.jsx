import { useContext, useState } from 'react';
import { Header } from '../shared/Header';
import { DataContext } from '../Root';
import { EventCard } from '../shared/EventCard';
import { Footer } from '../shared/Footer';
import { getStoredValue, clearStorage } from '../utils/localstorage';
import { AuthContext } from '../providers/authProviders';

export const SavedEvents = () => {
  const { data } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const [clear, setClear] = useState(false);

  return (
    <>
      <Header></Header>

      <main className="py-6 md:px-10 px-5 mt-8">
        <div className="mb-8 flex justify-between items-center">
          {!getStoredValue(user.uid).length ? <h1 className='text-2xl mb-1 text-red'>You have no Bookmark</h1> : (
            <>
              <h1 className="text-2xl mb-1">
                Your <span className="font-bold text-red">Bookmarks</span>
              </h1>
              <button
                onClick={() => {
                  clearStorage(user.uid) || setClear(!clear);
                }}
                className="active:scale-[.99] transition-transform underline"
              >
                Clear Saved Events
              </button>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-16 mb-16">
          {data
            .filter(item => getStoredValue(user.uid).includes(item.id))
            .map(ev => (
              <EventCard event={ev} key={ev.id} />
            ))}
        </div>
      </main>

      <Footer></Footer>
    </>
  );
};
