import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from 'next/link'
import ClassNames from "classnames"
import { useRouter } from "next/router";


function Navbar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const NavbarLinks = (
    <>
      <Link href="/">
        <a
          className={ClassNames("text-gray-400 hover:text-gray-700 px-3 py-2 text-sm font-medium", { "text-gray-800 border-b-2 border-gray-800": router?.pathname == "/" })}
        >
          Home
    </a>
      </Link>
      <Link href="/projects">
        <a
          className={ClassNames("text-gray-400 hover:text-gray-700 px-3 py-2 text-sm font-medium", { "text-gray-800 border-b-2 border-gray-800": router?.pathname == "/projects" })}
        >
          Projects
    </a>
      </Link>

      <Link href="/blogs">
    <a
      className={ClassNames("text-gray-400 hover:text-gray-700 px-3 py-2 text-sm font-medium", { "text-gray-800 border-b-2 border-gray-800":router?.pathname == "/blogs"})}
    >
      Blogs
    </a>
    </Link>

      <a
        href="/dist/files/okumujustine.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className={ClassNames("text-gray-400 hover:text-gray-700 px-3 py-2 text-sm font-medium", { "text-gray-800 border-b-2 border-gray-800": router?.pathname == "/resume" })}
      >
        Resume
    </a>
    </>
  )

  return (
    <div>
      <nav className="bg-white fixed w-full border-b-2 border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-between w-full">
              <div className="flex-shrink-0">
                <h1 className="text-gray-800 text-3xl font-bold">OJ</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {NavbarLinks}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {NavbarLinks}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
}

export default Navbar;