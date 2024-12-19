import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HomePageNav:React.FC = ()=> {
  return (
    <nav className="flex items-center justify-between h-16 px-10">
        <h1 className="text-4xl font-kanit">Letschat</h1>
        <div className="hidden md:flex items-center gap-5">
            <p>About Us</p>
            <p>Contact Us</p>
        </div>

        <div className="flex items-center gap-5">
            <Link href="/letschat">
            <p className='underline hover:no-underline'>Letschat</p>
            </Link>
            <Link href="/dashboard">
             <Image
                src="https://randomuser.me/api/portraits/women/40.jpg"
                alt="User Avatar"
                width={15}
                height={15}
                className="w-12 h-12 rounded-full"
            />
            </Link>
        </div>

    </nav>
  )
}

export default HomePageNav