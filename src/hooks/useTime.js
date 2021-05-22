import { useEffect, useState } from "react";

const getTime = () => new Date().toLocaleTimeString();

const useTime = () => {
  const [state, setState] = useState(getTime);

  useEffect(() => {
    setTimeout(() => {
      setState(getTime);
    }, 1000);
  });

  return state;
};

export default useTime;
