import React from "react";
import Image from "next/image";
import stars from "@pics/icons/Stars.svg";
import creditCard from "@pics/icons/creditCard.svg";
import clock from "@pics/icons/clock.svg";
import badge from "@pics/icons/badge.svg";
import service from "@pics/icons/service.svg";
const firstDisc = () => {
  return (
    <div className="flex gap-4 lg:flex-row md:flex-row flex-col my-36 max-w-screen-lg mx-auto ">
      <div>
        <Image src={stars} alt="image" />
      </div>

      <div className="flex flex-col ">
        <h1 className="items-center text-xl font-semibold justify-center mb-3 text-sky-500 flex  ">
          التميز في تقديم الخدمات{" "}
        </h1>
        <p className="text-center md:text-sm lg:text-sm text-xs xl:text-sm mb-3">
          لأن راحتك تهمنا، يسعدنا و يزيدنا سرورا أن نقدم لك الخدمات المختلفة بكل
          مصداقية وآمان. شعارنا هو كسب ثقة العملاء الكرام..
        </p>

        <div class="grid gap-6 md:grid-cols-2 sm:grid-cols-1  md:mx-auto mx-auto  lg:mx-6 mt-12">
          <div>
            <div className="flex flex-row ">
              <div className="me-2">
                <Image src={creditCard} alt="image" />
              </div>
              <div>
                <p className="text-sm">البطاقات والدفع</p>
                <p className="text-xs text-gray-800">نظام آمن</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row ">
              <div className="me-2">
                <Image src={service} alt="image" />
              </div>
              <div>
                <p className="text-sm">خدمة على مدار الساعة </p>
                <p className="text-xs text-gray-800">دعم فني 7 /24 </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-row ">
              <div className="me-2">
                <Image src={clock} alt="image" />
              </div>
              <div>
                <p className="text-sm">خدمة فورية </p>
                <p className="text-xs text-gray-800">
                  خدمة سريعة ونتائج فورية{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row ">
              <div className="me-2">
                <Image src={badge} alt="image" />
              </div>
              <div>
                <p className="text-sm">جودة الخدمة</p>
                <p className="text-xs text-gray-800">ستحصل على نتائج مُبهرة </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default firstDisc;
