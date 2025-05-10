// components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4 shadow-md flex justify-between rounded-b-xl border-b-4 border-black">
      <div className="font-bold text-xl">AI Tips</div>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/free" className="hover:underline">Free</Link>
        <Link href="/vip" className="hover:underline">VIP</Link>
        <Link href="/bet" className="hover:underline">Bet of the Day</Link>
      </div>
    </nav>
  );
}
