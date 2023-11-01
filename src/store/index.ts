import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
// import qs from "query-string";
import qs from "qs";

const getUrlSearch = () => {
  const a = window.location.search;
  // console.log("a", a);
  const b = a.slice(1);
  // console.log("b", b);
  return decodeURI(b);
};

const hashStorage: StateStorage = {
  getItem: (key): string => {
    // const searchParams = new URLSearchParams(window.location.hash.slice(1));
    // const storedValue = searchParams.get(key) ?? "";
    // return JSON.parse(storedValue);
    const urlSearch = getUrlSearch();
    if (urlSearch) {
      const searchParams = new URLSearchParams(urlSearch);
      const storedValue = searchParams.get(key);
      return JSON.parse(storedValue || "");
    }
    return "";
  },
  setItem: (key, newValue): void => {
    // const searchParams = new URLSearchParams(window.location.hash.slice(1));
    // searchParams.set(key, JSON.stringify(newValue));
    // // console.log(decodeURIComponent(searchParams.toString()));
    // // window.location.hash = searchParams.toString();
    // window.location.search = decodeURI(searchParams.toString());
    // if (getUrlSearch()) {
    const searchParams = new URLSearchParams(getUrlSearch());
    searchParams.set(key, JSON.stringify(newValue));
    // const a = qs.parse(searchParams.toString());
    // console.log("qs", a);
    // const b = qs.stringify(a, { encode: false });
    // console.log("qs 2", b);
    // const c = b.replaceAll('"', "").replaceAll("\\", "");
    // console.log("qs 2", qs.parse(searchParams.toString()));
    // console.log(decodeURI(searchParams.toString()));
    window.history.replaceState(
      null,
      "",
      `?${decodeURIComponent(searchParams.toString())
        .replaceAll('"', "")
        .replaceAll("\\", "")}`
    );
    // console.log("c", c);
    // window.history.pushState(null, "", `?${c}`);
    // window.location.search = b;
    // }
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  }
};

export const useStore = create<{
  count: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}>()(
  persist(
    (set) => ({
      count: 0,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 })
    }),
    {
      name: "count-hash-storage",
      storage: createJSONStorage(() => hashStorage)
    }
  )
);
