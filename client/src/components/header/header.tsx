import { Coffee, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import { FC } from "react"

const Header: FC = () => {
  return (
    <header className='fixed z-10 rounded-b top-0 left-0 right-0 bg-[#362D6C]'>
      <div className='container'>
        <div className='flex p-4 justify-between items-center'>
          <Link href='/' className='flex items-center space-x-2'>
            <Coffee className='h-8 w-8 text-amber-700' />
          </Link>

          <h2 className='text-2xl font-semibold'>Benaun&apos;s Coffee</h2>
          <div className='flex gap-2 md:gap-5'>
            <Link href='https://wa.me/79187922249'>
              <MessageCircle
                fill={"#16a34a"}
                className='hover:fill-green-900 h-8 w-8 ease-in duration-300 cursor-pointer'
              />
            </Link>
            <Link href='https://t.me/benaun_126'>
              <Send
                fill={"#0284c7"}
                className='hover:fill-sky-900 h-8 w-8 ease-in duration-300 cursor-pointer'
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
