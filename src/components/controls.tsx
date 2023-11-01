import * as React from "react";
import shallow from "zustand/shallow";
import { useStore } from "../store/index";

export const Controls = () => {
  console.log("Controls render");
  // 只会渲染一次，因为 increase 和 decrease 不会改变
  const [increase, decrease, reset] = useStore(
    (state) => [state.increase, state.decrease, state.reset],
    shallow
  );

  return (
    <div>
      <button onClick={increase}>+</button>
      <button onClick={decrease} style={{ marginLeft: 12 }}>
        -
      </button>
      <button onClick={reset} style={{ marginLeft: 12 }}>
        重置
      </button>
    </div>
  );
};
