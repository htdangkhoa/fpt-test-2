import { useCallback } from "react";
import useBlocker from "./useBlocker";

const usePrompt = (message: string, when: boolean = true) => {
  const blocker = useCallback(
    (tx: any) => {
      if (window.confirm(message)) tx.retry();
    },
    [message],
  );

  useBlocker(blocker, when);
};

export default usePrompt;
