import { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useLoaderData } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../assests/ReactToastify.modf.css'
import { AuthContext } from './providers/authProviders';
import { DatabaseContext } from './providers/databaseProvider';

export const DataContext = createContext([]);

export const Root = () => {
  const [data, setData] = useState(useLoaderData());
  const { user, loading } = useContext(AuthContext)
  const { fetchData, setDatabaseData } = useContext(DatabaseContext)



  useEffect(() => {
      if(!loading && user) fetchData(user.uid)
      if(!user) {
        setDatabaseData([])
        return () => {}
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])


  return (
    <DataContext.Provider value={{ data, setData }}>
      <Outlet />
      
      <ScrollRestoration />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
    </DataContext.Provider>
  );
};
