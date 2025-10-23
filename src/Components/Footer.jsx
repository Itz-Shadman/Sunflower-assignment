import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold mb-2">Contact</h4>
          <p>Email: skillswap@example.com</p>
          <p>Phone: +880 1XXXXXXXXX</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex gap-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-indigo-400">Facebook</a>
            <a href="#" aria-label="Twitter" className="hover:text-indigo-400">Twitter</a>
            <a href="#" aria-label="Instagram" className="hover:text-indigo-400">Instagram</a>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <a href="/privacy" className="hover:text-indigo-400">Privacy Policy</a>
        </div>
      </div>
      <div className="text-center text-gray-400 mt-4">
        © {new Date().getFullYear()} Skillswap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
