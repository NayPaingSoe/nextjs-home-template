import Image from "next/image";

export default function Home() {

  return (
    <div className=" text-gray-900 font-sans">
      {/* <!-- Navbar --> */}
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
          <button className="bg-black text-white px-4 py-2 rounded">Login</button>
        </div>
      </nav>
      <div className="">
        {/* <!-- Hero Section --> */}
        <section className="flex flex-col md:flex-row justify-between items-center px-28 pt-6 bg-gray-100 ">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-xl">Do your home Loan together with</h2>
            <h1 className="text-3xl font-medium">an <span className="text-black">Expert Home Loan Specialist!</span></h1>
            <div className="w-16 h-1 bg-green-400"></div>
            <p className="text-gray-700">
              Givecredit allows you to structure your home loan to get best deal for you with the expert advice of dedicated mortgage broker
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-300 px-6 py-2 rounded hover:bg-green-400">I want to buy home</button>
              <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">I want to refinance</button>
            </div>
            <p className="text-sm">Calculate, save and come later</p>
          </div>
          <div className="relative md:w-1/2 flex justify-center mt-8 md:mt-0">
            <div className="absolute w-80 h-80 bg-[#a9dece] rounded-full top-10 right-8"></div>
            <Image src="/images/human.png" alt="Loan Specialist" width={288} height={436} className="z-1 w-90 h-auto object-cover" />
          </div>
        </section>

        {/* <!-- Services Section --> */}
        <div className="px-28 -mt-10 z-20 relative">
          <section className="bg-black text-white py-6">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
              <div>
                <h3 className="font-bold">Type of Service</h3>
                <p className="text-sm text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
              </div>
              <div className="flex space-x-6 text-sm items-center">
                <div className="flex items-center space-x-2"><span>🏠</span><span>Home</span></div>
                <div className="flex items-center space-x-2"><span>🚗</span><span>Car</span></div>
                <div className="flex items-center space-x-2"><span>💲</span><span>SMSF</span></div>
                <div className="flex items-center space-x-2"><span>✅</span><span>Personal</span></div>
              </div>
            </div>
          </section>
        </div>
      </div>




      {/* <!-- Our Lenders --> */}
      <section className="py-10 text-center">
        <h3 className="text-lg font-medium">Our Lenders</h3>
        <p className="text-xl font-semibold mt-2 mb-6">Get the best Deal from 60+ Banks & Lenders</p>
        <div className="flex flex-wrap justify-center gap-6 px-8">
          <img src="logo1.png" className="h-6" />
          <img src="logo2.png" className="h-6" />
          <img src="logo3.png" className="h-6" />
          {/* <!-- Add more logos as needed --> */}
        </div>
      </section>

      {/* <!-- Rate Table Section --> */}
      <section className="grid md:grid-cols-2 px-6 py-12 gap-8 bg-white">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Start Your Home Loan Journey</h3>
          <h2 className="text-2xl font-bold">Simple and Easy steps for You</h2>
          <button className="bg-green-300 px-6 py-2 rounded mt-4 hover:bg-green-400">Book Now</button>
        </div>
        <div>
          <table className="w-full bg-black text-white rounded overflow-hidden">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">Best Rate</th>
                <th>Term</th>
                <th>Rate</th>
                <th>APR</th>
              </tr>
            </thead>
            <tbody className="text-center text-black bg-white">
              <tr className="bg-[#B2FCE4]">
                <td className="py-2">Bank A</td><td>3 Yrs</td><td>5.65%</td><td>5.5%</td>
              </tr>
              <tr><td className="py-2">Bank B</td><td>3 Yrs</td><td>5.65%</td><td>5.5%</td></tr>
              <tr className="bg-[#B2FCE4]"><td className="py-2">Bank C</td><td>3 Yrs</td><td>5.65%</td><td>5.5%</td></tr>
              <tr><td className="py-2">Bank D</td><td>3 Yrs</td><td>5.65%</td><td>5.5%</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* <!-- Calculator Section --> */}
      <section className="bg-white px-8 py-12 text-center">
        <h3 className="text-lg font-medium">Calculators</h3>
        <h2 className="text-2xl font-bold mb-6">Master Your Financial Journey Using Our Home Loan Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold">How much can I borrow?</h4>
            <p className="text-sm text-gray-600">Use your income and expenses to estimate how much you may be able to borrow.</p>
            <a href="#" className="text-blue-600 mt-2 inline-block">Calculate Now</a>
          </div>
          <div>
            <h4 className="font-semibold">Mortgage Repayment</h4>
            <p className="text-sm text-gray-600">Estimate your repayments and loan cost over time.</p>
            <a href="#" className="text-blue-600 mt-2 inline-block">Calculate Now</a>
          </div>
          <div>
            <h4 className="font-semibold">LVR Calculator</h4>
            <p className="text-sm text-gray-600">Check your Loan to Value Ratio easily here.</p>
            <a href="#" className="text-blue-600 mt-2 inline-block">Calculate Now</a>
          </div>
        </div>
      </section>

      {/* <!-- Why Us Section --> */}
      <section className="flex flex-col md:flex-row justify-between items-center px-8 py-16 bg-gray-100 gap-8">
        <div className="md:w-1/2">
          <img src="meeting.jpg" alt="Why Us" className="rounded-lg shadow-md" />
        </div>
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-gray-500">Why Us?</h3>
          <h2 className="text-xl font-bold">Not fo Lenders, best for you</h2>
          <ul className="space-y-2">
            <li><strong>✅ Latest Technology</strong> - Lorem ipsum description.</li>
            <li><strong>✅ Transparent Advice</strong> - Lorem ipsum description.</li>
            <li><strong>✅ After Hour Availability</strong> - Lorem ipsum description.</li>
          </ul>
        </div>
      </section>

      {/* <!-- Testimonials --> */}
      <section className="text-center py-12">
        <h3 className="text-gray-500">Testimonials</h3>
        <h2 className="text-2xl font-bold mb-8">Happy Clients are our Products.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-600">"Lorem ipsum dolor sit amet..."</p>
            <p className="mt-2 font-bold">Kaung Khant</p>
            <p className="text-sm text-gray-500">Head of Product</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-600">"Lorem ipsum dolor sit amet..."</p>
            <p className="mt-2 font-bold">Kaung Khant</p>
            <p className="text-sm text-gray-500">Head of Product</p>
          </div>
          <div className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-600">"Lorem ipsum dolor sit amet..."</p>
            <p className="mt-2 font-bold">Kaung Khant</p>
            <p className="text-sm text-gray-500">Head of Product</p>
          </div>
        </div>
      </section>

      {/* <!-- Final CTA Section --> */}
      <section className="bg-white py-12 px-6 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-2">Master Your Financial Journey</h3>
          <p className="text-sm text-gray-600">Using Our Home Loan Calculators</p>
        </div>
        <div>
          <h4 className="font-semibold">CALCULATE</h4>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
          <button className="mt-2 px-4 py-2 border text-sm">Calculate Now</button>
        </div>
        <div>
          <h4 className="font-semibold">BOOK</h4>
          <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet...</p>
          <button className="mt-2 px-4 py-2 border text-sm">Book Now</button>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <footer className="bg-black h-24"></footer>
    </div>


  );
}

export async function generateMetadata() {
  return {
    title: 'Home Page',
    description: 'Welcome to the home page',
  }
}
