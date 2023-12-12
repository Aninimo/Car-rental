import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import { Search } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { ICategories } from '../interfaces'

interface IProps {
  categories: ICategories[];
}

export function Navbar({ categories }: IProps) {
  return (
    <nav className='w-screen flex justify-between p-8 absolute bg-transparent z-10 text-white'>
      <h2 className='font-bold sm:text-xs lg:text-3xl'>
         CAR TRADE
      </h2>
      <ul>
        <li>
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            modules={[Pagination]}
            className='w-44'
          >
            {categories.map((category) => (
              <SwiperSlide
                key={category.id}
                className='text-center'
              >
                <Link 
                  href={`/brand/${category.id}`}
                  className='text-2xl sm:text-md cursor-pointer'
                >              
                  {category.name}
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </li>
      </ul>
      <Search/>
    </nav>
  );
}
