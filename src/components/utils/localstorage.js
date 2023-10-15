import { toast } from 'react-toastify';

const getStoredValue = (uid) => {
  if(!uid) {
    toast('Something went wrong.')
    return
  }
  const storedValue = localStorage.getItem(uid);
  return storedValue ? JSON.parse(storedValue) : [];
};

const saveToLocale = (id, uid) => {
    if(!uid) {
      toast('Something went wrong.')
      return
    }

    const storage = getStoredValue(uid);
    if (!storage.find(eventID => eventID === id)) {
      storage.push(id);
      localStorage.setItem(uid, JSON.stringify(storage));
      toast('Your event has been successfully added to your bookmarks');
    } 
    else toast('You have already added this event to your bookmarks');
};

const clearStorage = (uid) => {
  if(!uid) {
    toast('Something went wrong.')
    return
  }
  
  localStorage.setItem(uid, '')
};

export { getStoredValue, saveToLocale, clearStorage };