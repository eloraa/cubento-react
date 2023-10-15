import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { get, onValue, set } from 'firebase/database';
import { ref } from 'firebase/database';
import { database } from '../utils/firebase.config';
import { toast } from 'react-toastify';

export const DatabaseContext = createContext(null);

export const DatabaseProvier = ({ children }) => {
  const [databaseData, setDatabaseData] = useState([]);

  const writeData = (name, email, paymentID, eventID, userID) => {
    let error;
    const databaseRef = ref(database, userID);
    get(databaseRef)
      .then(snapshot => {
        let currentData = snapshot.val() || [];

        if (currentData.filter(e => e.eventID === eventID).length) {
          error = new Error('Already booked');
          toast('You have already booked this event.');
          return;
        }

        if (!Array.isArray(currentData)) {
          currentData = [];
        }
        const newData = {
          name: name,
          email: email,
          paymentID: paymentID,
          eventID: eventID,
          date: Math.floor(new Date().getTime() / 1000),
          locale: Intl.DateTimeFormat().resolvedOptions().timeZone
        };

        currentData.push(newData);

        set(databaseRef, currentData).catch(err => {
          error = err;
          toast("Something went wrong. Please contact us if your booking isn't showing.");
        });
      })
      .catch(() => {
        toast("Something went wrong. Please contact us if your booking isn't showing.");
      });

    return error;
  };

  const deleteData = (uid) => {
    let error;
    const databaseRef = ref(database, uid);

    set(databaseRef, []).catch(err => {
      error = err;
      toast("Something went wrong. Please contact us if your booking isn't showing.");
    });

    if(!error) setDatabaseData([])

    return error;
  };

  const fetchData = uid => {
    const dbRef = ref(database, uid);

    onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setDatabaseData(data);
      }
    });
  };

  return <DatabaseContext.Provider value={{ writeData, fetchData, deleteData, databaseData, setDatabaseData }}>{children}</DatabaseContext.Provider>;
};

DatabaseProvier.propTypes = {
  children: PropTypes.node,
};
