"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../SlideShow.css";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import { useState } from "react";
import { ImageInProduct } from "@/interfaces";
import { ProductImage } from "../product-image/ProductImage";

interface Props {
  images: ImageInProduct[];
  title: string;
  className?: string;
}

export const ProductSliceShow = ({ className, images, title }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ProductImage
              src={`${image.url}`}
              width={1024}
              height={800}
              alt={image.url!}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ProductImage
              src={`${image.url}`}
              width={1024}
              height={800}
              alt={image.url!}
              className="mr-5 rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
