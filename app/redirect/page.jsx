"use client";
import { useEffect } from "react";
import { GoSell } from "@tap-payments/gosell";

const Redirect = () => {
   useEffect(() => {
      GoSell.showResult({
         callback: (response) => {
            console.log("callback", response);
         },
      });
   }, []);

   return (
      <div className="App">
         <GoSell />
      </div>
   );
};

export default Redirect;
