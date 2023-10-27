"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import YoutubeBanner from "@pics/banners/YoutubeSlider.png";
import InstaBanner from "@pics/banners/الانستغرام.png";
import TiktokBanner from "@pics/banners/بنر تيك توك.png";
import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";

const Slider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = new BlazeSlider(sliderRef.current, {
      all: {
        slidesToShow: 1,
        transitionDuration: 800,

        enableAutoplay: true,
        autoplayDirection: "to left",
        stopAutoplayOnInteraction: true,
      },
    });
    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div
      className="blaze-slider max-w-screen-lg lg-h-98  mx-auto flex justify-center"
      ref={sliderRef}
    >
      <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track ">
            <div className="Zoom-out">
              <Image src={YoutubeBanner} />
            </div>
            <div className="Zoom-out">
              <Image src={InstaBanner} />
            </div>
            <div layout="fill">
              <Image src={TiktokBanner} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
