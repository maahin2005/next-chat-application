import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const menus = ["Demos", "About", "Blogs", "Pages", "Contact"];

  return (
    <nav className="h-16 flex justify-center items-center relative">
      <div className="flex justify-between items-center w-4/5 h-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-4xl font-semibold bg-gradient-to-r from-contractColor-light to-contractColor-dark bg-clip-text text-transparent font-sans"
        >
          Letschat
        </Link>

        {/* Desktop Menus */}
        <div className="hidden md:flex items-center gap-8">
          {menus.map((menu, index) => (
            <Link
              key={index}
              href={`#${menu.toLowerCase()}`}
              className="text-gray-700 hover:text-contractColor-dark transition"
            >
              {menu}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/auth/login" className="text-gray-700">
            Login
          </Link>
          <button className="min-w-36 w-full p-2 h-full bg-contractColor-light hover:bg-contractColor-dark text-white rounded-md">
            Get Started free
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <MobileMenu menus={menus} />
      </div>
    </nav>
  );
}

// Mobile Menu Component
function MobileMenu({ menus }: { menus: string[] }) {
  return (
    <div className="md:hidden">
      {/* Menu Toggle (Checkbox-Based Toggle System) */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      <label
        htmlFor="menu-toggle"
        className="text-2xl cursor-pointer peer-checked:text-contractColor-dark"
        aria-label="Toggle Mobile Menu"
      >
        ☰
      </label>


      {/* Dropdown Menu for Mobile */}
      <div className="hidden peer-checked:flex flex-col items-center absolute left-0 right-0 top-16 bg-white shadow-lg z-20">
        {menus.map((menu, index) => (
          <Link
            key={index}
            href={`#${menu.toLowerCase()}`}
            className="py-2 w-full text-center text-gray-700 hover:text-contractColor-dark transition"
          >
            {menu}
          </Link>
        ))}
        <Link href="/login" className="py-2 w-full text-center text-gray-700">
          Login
        </Link>
        <Button className="w-4/5 my-2">Get Started Free</Button>
      </div>
    </div>
  );
}
