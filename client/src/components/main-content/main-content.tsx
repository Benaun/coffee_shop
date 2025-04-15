"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { FC } from "react"

const MainContent: FC = () => {
  return (
    <div className='absolute inset-0 z-0 bg-main-background bg-center bg-cover'>
      <div className='absolute inset-0 bg-black/50' />
      <div className='relative z-10 h-full flex items-center justify-center text-center container'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mx-auto px-4'
        >
          <h1 className='text-4xl font-bold text-white mb-6'>
            Погрузись в эйфорию идеального напитка.
          </h1>
          <p className='text-md text-gray-200 mb-8 mx-4'>
            Каждая чашка, которую мы подаем, является результатом тщательного отбора,
            профессиональной обжарки и точного заваривания. Мы работаем напрямую с фермерами, чтобы
            обеспечить наивысшее качество зерен.
          </p>
          <div className='flex justify-center'>
            <Link
              href='/menu'
              className='bg-amber-700 hover:bg-amber-800 text-white px-2 py-4 rounded-xl'
            >
              Посмотреть меню
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MainContent
