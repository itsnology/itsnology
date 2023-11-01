"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import PubgBanner from "@pics/banners/ببجي.png";
import TwitchBanner from "@pics/banners/بنر تويتش.png";
import InstaBanner from "@pics/banners/الانستغرام.png";
import TiktokBanner from "@pics/banners/بنر تيك توك.png";
import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";

const banners = [
  { src: PubgBanner, alt: "PUBG Banner" },
  { src: TwitchBanner, alt: "Twitch Banner" },
  { src: InstaBanner, alt: "Instagram Banner" },
  { src: TiktokBanner, alt: "TikTok Banner" },
];

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
      className="blaze-slider lg:mx-12 mx:auto flex justify-center"
      ref={sliderRef}
    >
      <div className="blaze-container">
        <div className="blaze-track-container">
          <div className="blaze-track">
            {banners.map((banner, index) => (
              <div key={index} className="Zoom-out">
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  className="lg:h-auto h-48 md:h-72	"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
