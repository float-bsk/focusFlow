import { Link } from "react-router-dom"
import { HamburgerIcon } from "../assets/svgs/hamburger";
import { useState } from "react";

const Navbar = () => {

    const [open, setOpen] = useState(false);
    return <nav className="relative w-full p-2 h-16 top-0 left-0 right-0 flex items-center-safe bg-amber-100 font-poppins text-blue-500 ">
        <Logo />
        <DateC />
        {/* Desktop Menu */}
        <div className="hidden lg:block">
            <Link to="/">Home</Link> | {" "}
            <Link to="/stats">Stats</Link> | {" "}
            <Link to="/about">About</Link> | {" "}
            <Link to="/contacts">Contact</Link>
        </div>

        <div className="md:hidden grow">
            <button onClick={() => setOpen((p: boolean) => !p)}><HamburgerIcon /></button>
        </div>
        {/* Mobile Menu */}
       {
        open && 
        <div className="md:hidden flex flex-col gap-4 p-4 z-10 text-start right-0 top-16 bg-amber-100 rounded-lg shadow absolute">
            <Link to="/">Home</Link>
            <Link to="/stats">Stats</Link>
            <Link to="/about">About</Link>
            <Link to="/contacts">Contact</Link>
        </div>
       }

    </nav>
}

const Logo = () => {

    return <header className="grow">
        <section className="font-poppins p-2 bg-amber-300 w-fit rounded-md grow-3">
            <h1 className="text-blue-700 text-bold text-lg">
                Focus <span className="italic text-green-700">Flow</span> 
            </h1>
        </section>
    </header>
}

const DateC = () => {
    const date = new Date().toDateString();
    return <time dateTime={date}
        className="text-gray-600 grow-2"
    >{date}</time>
}

export default Navbar