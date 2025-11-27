import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { WebStorage } from "redux-persist/es/types";

// no op storage for SSR 
function createNoopStorage():WebStorage{
    return {
        getItem:(_key:string):Promise<string | null>=>{
        return Promise.resolve(null)
    },
    setItem:(_key:string,value:string):Promise<void>=>{
        return Promise.resolve()
    },
    removeItem:(_key:string):Promise<void>=>{
      return Promise.resolve();
    }
    }
    
}

export  const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()