import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Phone, Calendar, ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const departmentLinks = [
    { name: "Cardiology", path: "/departments/cardiology" },
    { name: "Neurology", path: "/departments/neurology" },
    { name: "Orthopedics", path: "/departments/orthopedics" },
    { name: "Pediatrics", path: "/departments/pediatrics" },
    { name: "Oncology", path: "/departments/oncology" },
    { name: "Ambulance Services", path: "/ambulatory-services" },
  ];

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Specialists | Doctors", path: "/doctors" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 z-50">
          <div className="w-10 h-10 bg-hospital-500 text-white rounded-lg flex items-center justify-center font-display text-xl relative overflow-hidden group">
            <span className="absolute inset-0 bg-hospital-600 transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-bottom-right"></span>
            <span className="relative z-10">M+</span>
          </div>
          <span className={cn(
            "font-display text-xl transition-all",
            isScrolled ? "text-hospital-800" : "text-hospital-700"
          )}>
            MediCare<span className="text-hospital-500 font-bold relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-hospital-500 after:bottom-0 after:left-0 after:origin-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left after:transition-transform after:duration-300">Plus</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <NavigationMenu className="mr-4">
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <Link 
                    to={link.path}
                    className={cn(
                      "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      location.pathname === link.path
                        ? "text-hospital-600 font-semibold"
                        : "text-gray-700 hover:text-hospital-600"
                    )}
                  >
                    {link.name}
                  </Link>
                </NavigationMenuItem>
              ))}
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname.includes("/departments")
                    ? "text-hospital-600 font-semibold"
                    : "text-gray-700 hover:text-hospital-600"
                )}>
                  Departments
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {departmentLinks.map((dept) => (
                      <li key={dept.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={dept.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-400 hover:text-hospital-600"
                          >
                            <div className="text-sm font-medium leading-none">{dept.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-gray-500">
                              Specialized care and treatment for {dept.name.toLowerCase()} conditions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {/* <NavigationMenuTrigger className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname.includes("/doctors")
                    ? "text-hospital-600 font-semibold"
                    : "text-gray-700 hover:text-hospital-600"
                )}>
                  Doctors
                </NavigationMenuTrigger> */}
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {/* Removed doctorLinks */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {/* <NavigationMenuTrigger className={cn(
                  "group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname.includes("/careers")
                    ? "text-hospital-600 font-semibold"
                    : "text-gray-700 hover:text-hospital-600"
                )}>
                  Careers
                </NavigationMenuTrigger> */}
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    {/* Removed careerLinks */}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-hospital-500 text-hospital-700 hover:bg-orange-400 transition-all group">
              <Phone size={16} className="mr-2 text-hospital-600 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Emergency : 911 or 999</span>
            </Button>
            <Button asChild className="bg-hospital-600 hover:bg-hospital-700 group relative overflow-hidden">
              <Link to="/appointments" className="flex items-center">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-hospital-500 to-hospital-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <Calendar size={16} className="mr-2 relative z-10" />
                <span className="relative z-10">Book Appointment</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={cn(
                "absolute block h-0.5 w-6 bg-gray-800 transform transition-all duration-300",
                isMobileMenuOpen
                  ? "top-2 rotate-45"
                  : "top-0"
              )}
            />
            <span
              className={cn(
                "absolute block h-0.5 bg-gray-800 transform transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-0 w-0"
                  : "opacity-100 w-6 top-2"
              )}
            />
            <span
              className={cn(
                "absolute block h-0.5 w-6 bg-gray-800 transform transition-all duration-300",
                isMobileMenuOpen
                  ? "top-2 -rotate-45"
                  : "top-4"
              )}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-transform duration-300 ease-in-out md:hidden",
            isMobileMenuOpen
              ? "translate-x-0"
              : "translate-x-full"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-hospital-50/50 to-white/50 opacity-50"></div>
          <nav className="flex flex-col items-center gap-6 w-full px-12 relative z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-medium py-2 border-b border-gray-100 w-full text-center transition-all duration-200",
                  location.pathname === link.path
                    ? "text-hospital-600 border-hospital-500"
                    : "text-gray-800 hover:text-hospital-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="relative w-full py-2 border-b border-gray-100 text-center">
              <div className="text-xl font-medium text-gray-800 flex items-center justify-center">
                Departments <ChevronDown className="ml-2 h-4 w-4" />
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {departmentLinks.map((dept) => (
                  <Link
                    key={dept.name}
                    to={dept.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm text-gray-700 py-1 hover:text-hospital-600"
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div className="relative w-full py-2 border-b border-gray-100 text-center">
              <div className="text-xl font-medium text-gray-800 flex items-center justify-center">
                Doctors <ChevronDown className="ml-2 h-4 w-4" />
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {/* Removed doctorLinks */}
              </div>
            </div>

            <div className="relative w-full py-2 border-b border-gray-100 text-center">
              <div className="text-xl font-medium text-gray-800 flex items-center justify-center">
                Careers <ChevronDown className="ml-2 h-4 w-4" />
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2">
                {/* Removed careerLinks */}
              </div>
            </div>

            <Link
              to="/ambulatory-services"
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-xl font-medium py-2 border-b border-gray-100 w-full text-center",
                location.pathname === "/ambulatory-services"
                  ? "text-hospital-600"
                  : "text-gray-800"
              )}
            >
              Ambulance Services
            </Link>
            
            <Button asChild className="mt-6 w-full bg-hospital-600 hover:bg-hospital-700">
              <Link to="/appointments" onClick={() => setIsMobileMenuOpen(false)}>
                Book Appointment
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
