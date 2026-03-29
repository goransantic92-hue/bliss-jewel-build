import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-6 py-24">
      <div className="text-center max-w-md">
        <h1 className="font-display text-4xl text-foreground mb-3">404</h1>
        <p className="text-sm text-muted-foreground mb-8 font-body">Lorem ipsum — page not found.</p>
        <Link to="/" className="text-primary text-xs uppercase tracking-[0.2em] border-b border-primary font-body hover:opacity-80">
          Lorem back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
