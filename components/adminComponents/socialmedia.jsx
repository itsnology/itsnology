"use client";
import { useState } from "react";

const SocialMedia = ({ productName, category }) => {
   const [options, setOptions] = useState([{ name: "", price: "" }]);
   const [selectedCategory, setSelectedCategory] = useState(category);
   const [selectedProduct, setSelectedProduct] = useState(productName);

   const handleOptionChange = (index, event) => {
      const values = [...options];
      values[index][event.target.name] = event.target.value;
      setOptions(values);
   };

   const handleAddOption = () => {
      setOptions([...options, { name: "", price: "" }]);
   };

   const handleRemoveOption = (index) => {
      const values = [...options];
      values.splice(index, 1);
      setOptions(values);
   };

   const handleCategoryChange = (value) => {
      setSelectedCategory(value);
   };

   return (
      <div className="flex flex-col justify-center">
         <h1 className="text-2xl font-bold mb-4">
            إضافة منتج لخدمات لـ {category}
         </h1>
         <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide font-bold mb-2 text-right"
                     htmlFor="productName"
                  >
                     اسم المنتج
                  </label>
                  <input
                     type="text"
                     id="productName"
                     name="productName"
                     className="ml-2 border rounded py-2 px-3 text-right w-64 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                     value={productName}
                     onChange={(e) => setSelectedProduct(e.target.value)}
                  />
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3">
                  <label
                     className="block uppercase tracking-wide  font-bold mb-2 text-right"
                     htmlFor="description"
                  >
                     الوصف
                  </label>
                  <textarea
                     className="ml-2 border rounded py-2 px-3 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                     id="description"
                     placeholder="أدخل الوصف"
                     rows={8}
                  ></textarea>
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3">
                  <label
                     className="block uppercase tracking-wide font-bold mb-2 text-right"
                     htmlFor="options"
                  >
                     الخيارات
                  </label>
                  {options.map((option, index) => (
                     <div key={index} className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-1/2 px-3">
                           <input
                              className="ml-2 border rounded py-2 px-3 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              name="name"
                              type="text"
                              placeholder="أدخل اسم الخيار"
                              value={option.name}
                              onChange={(event) =>
                                 handleOptionChange(index, event)
                              }
                           />
                        </div>
                        <div className="w-1/2 px-3">
                           <input
                              className="ml-2 border rounded py-2 px-3 text-right w-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                              name="price"
                              type="text"
                              placeholder="أدخل سعر الخيار"
                              value={option.price}
                              onChange={(event) =>
                                 handleOptionChange(index, event)
                              }
                           />
                        </div>
                        <div className="w-1/2 px-3">
                           <button
                              type="button"
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                              onClick={() => handleRemoveOption(index)}
                           >
                              حذف
                           </button>
                        </div>
                     </div>
                  ))}
                  <button
                     type="button"
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                     onClick={handleAddOption}
                  >
                     إضافة خيار
                  </button>
               </div>
            </div>
            <div className="flex items-center justify-center">
               <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  type="button"
               >
                  إرسال
               </button>
            </div>
         </form>
      </div>
   );
};

export default SocialMedia;
