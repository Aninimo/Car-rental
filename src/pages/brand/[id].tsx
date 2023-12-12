import { GetServerSideProps } from 'next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules'

import { Navbar } from '../../components/navbar'
import { CarInfo } from '../../components/carInfo'
import { client } from '../../services/apollo-client'
import { GET_CATEGORIES, GET_CARS } from '../../services/queries'
import { ICategories, ICar } from '../../interfaces'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Props {
  categories: ICategories[];
  cars: ICar[];
}

export default function Brand({ categories, cars }: Props){
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <div className='relative'>
       <Navbar categories={categories}/>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
           className='w-screen h-screen'
        >
          {cars.map((car) => (
            <SwiperSlide className='w-screen h-screen' key={car.id}>
              <div style={{ backgroundColor: car.colorTop.hex }} className='h-1/2'></div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <CarInfo car={car}/>
              </div>
              <div style={{ backgroundColor: car.colorBottom.hex }} className='h-1/2'></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id

  const { data: categoriesData } = await client.query({
    query: GET_CATEGORIES,
  })
  
  const { data } = await client.query({
    query: GET_CARS,
    variables: {
      id: id,
    },
  })
  
  return{
    props:{
      categories: categoriesData.categories,
      cars: data.category.cars,
    }
  }
}
