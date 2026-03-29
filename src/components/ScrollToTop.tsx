import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top when the route changes (e.g. product page, cart, etc.). */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
