import React from 'react'

export default function Navbar() {
  return (
     <nav className="bg-gray-100 shadow">
        <div className="container mx-auto flex justify-around items-center px-6 py-4">
          <div className="text-xl font-bold">GiveCredit</div>
          <div className="flex space-x-8">
            <a href="#" className="border-b-2 border-green-400 pb-1">Home</a>
            <a href="#" className="hover:text-green-500">Loan</a>
            <a href="#" className="hover:text-green-500">Calculator</a>
            <a href="#" className="hover:text-green-500">Resources</a>
            <a href="#" className="hover:text-green-500">About</a>
          </div>
          <button className="bg-black text-white px-8 font-medium  py-2 ">Login</button>
        </div>
      </nav>
  )
}
