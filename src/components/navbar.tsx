import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
     <nav className="bg-gray-100 shadow">
        <div className="container mx-auto flex justify-around items-center px-6 py-4">
          <div className="text-xl font-bold">GiveCredit</div>
          <div className="flex space-x-8">
            <Link href="/" className="border-b-2 border-green-400 pb-1">Home</Link>
            <Link href="/loan" className="hover:text-green-500">Loan</Link>
            <Link href="/calculator" className="hover:text-green-500">Calculator</Link>
            <Link href="/resources" className="hover:text-green-500">Resources</Link>
            <Link href="/about" className="hover:text-green-500">About</Link>
          
          </div>
          <Link href="/signin">
            <button className="bg-black text-white px-8 font-medium py-2">Login</button>
          </Link>
        </div>
      </nav>
  )
}
