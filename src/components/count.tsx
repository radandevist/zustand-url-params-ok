import * as React from "react";
import { useStore } from "../store/index";


export const Count = () => {
  // console.log("count render");
  // 仅当 count 改变时重新渲染
  const count = useStore((state) => state.count);
  return <div>{count}</div>;
};
