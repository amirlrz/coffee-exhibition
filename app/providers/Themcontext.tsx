'use client'
import React, { createContext, ReactNode, useState } from "react";
type StoreProviderProps = {
  children: ReactNode;
};
type storeContextType = {
  ImgLoaded: boolean;
  setImgLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
const storeContext = createContext<storeContextType | undefined>(undefined);
function StoreProvider({ children }: StoreProviderProps) {
  const [ImgLoaded, setImgLoaded] = useState(false);


  return (
    <div>
      <storeContext.Provider
        value={{
          ImgLoaded ,setImgLoaded
        }}
      >
        {children}
      </storeContext.Provider>
    </div>
  );
}

export { StoreProvider };
export default storeContext;

