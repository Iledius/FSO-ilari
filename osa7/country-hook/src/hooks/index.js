import { useState } from "react";

export const useCountry = () => {
  const [country, setCountry] = useState("");

  const onSubmit = (e) => {
    setCountry(e.target.value);
  };

  return { country, onSubmit };
};
