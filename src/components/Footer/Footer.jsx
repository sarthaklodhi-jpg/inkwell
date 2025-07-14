import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="w-full bg-white bg-opacity-90 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
        <div className="flex flex-col gap-4 md:w-1/3">
          <Logo width="100px" />
          <p className="text-sm text-gray-500">&copy; 2023 DevUI. All Rights Reserved.</p>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-20">
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Features</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Pricing</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Affiliate Program</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Press Kit</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Account</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Help</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Contact Us</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Customer Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase text-gray-500 mb-4">Legals</h3>
            <ul className="space-y-2">
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Terms & Conditions</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Privacy Policy</Link></li>
              <li><Link className="text-base text-gray-700 hover:text-blue-600" to="/">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer