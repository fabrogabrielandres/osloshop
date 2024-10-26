'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import "../SlideShow.css";
import { ImageInProduct } from '@/interfaces';



interface Props {
  images: ImageInProduct[];
  title: string;
  className?: string;
}



export const ProductMobileSlideshow = ( { images, title, className }: Props ) => {


  return (
    <div className={ className }>

      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={ [ FreeMode, Autoplay, Pagination ] }
        className="mySwiper2"
      >

        {
          images.map( image => (
            <SwiperSlide key={ image.id }>
              <Image
                width={ 600 }
                height={ 500 }
                src={ `/products/${ image.url }` }
                alt={ title }
                className="object-fill"
              />
            </SwiperSlide>

          ) )
        }
      </Swiper>



    </div>
  );
};