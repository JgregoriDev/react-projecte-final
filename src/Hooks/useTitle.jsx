import React, { useEffect } from "react";
export default function useTitle(titleString) {
  useEffect(() => {
    document.title = titleString;
  });
}