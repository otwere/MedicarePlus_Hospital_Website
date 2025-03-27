
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white to-hospital-50">
        <div className="max-w-lg w-full text-center">
          <div className="relative mb-8 mx-auto">
            <h1 className="text-8xl md:text-9xl font-display font-bold text-hospital-200 animate-float">
              404
            </h1>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <h2 className="text-3xl font-display font-medium text-hospital-700">
                Page Not Found
              </h2>
            </div>
          </div>
          
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved. Please check the URL or navigate back to our homepage.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-hospital-600 hover:bg-hospital-700">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-hospital-300 text-hospital-700 hover:bg-blue-300">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
