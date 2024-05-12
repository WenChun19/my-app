import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [storageItem, setStorageItem] = useState(() => {
    const item = localStorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }

    return [];
  });

  useEffect(() => {
    // console.log(storageItem);
    localStorage.setItem(key, JSON.stringify(storageItem));
  }, [storageItem]);

  return [storageItem, setStorageItem];
};

export default useLocalStorage;
