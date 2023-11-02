"use client";
import { useState } from "react";

const CardService = ({ productName, category }) => {
   const [price, setPrice] = useState("");
   const [photo, setPhoto] = useState("");
   const [codes, setCodes] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState(productName);
   const [count, setCount] = useState(0);

   const handleNameChange = (e) => {
      setName(e.target.value);
   };

   const handlePriceChange = (e) => {
      setPrice(e.target.value);
   };

   const handlePhotoChange = (e) => {
      setPhoto(e.target.value);
   };

   const handleCodeChange = (e, index) => {
      const newCodes = [...codes];
      newCodes[index][e.target.name] = e.target.value;
      setCodes(newCodes);
   };

   const handleAddCode = () => {
      setCodes([...codes, { code: "", data: "" }]);
      setCount(count + 1); // increment count when a code is added
   };

   const handleDeleteCode = (index) => {
      const list = [...codes];
      list.splice(index, 1);
      setCodes(list);
      setCount(count - 1); // decrement count when a code is deleted
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ name, price, photo, codes });
   };

   return (
      <div className="flex flex-col  justify-center py-2">
         <h1 className="text-2xl font-bold mb-4">
            إضافة منتج لخدمات لـ {category}
         </h1>
         <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0  ">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="name"
                  >
                     اسم المنتج
                  </label>
                  <div className="flex">
                     <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mx-4"
                        id="name"
                        type="text"
                        placeholder="اسم المنتج"
                        value={productName}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                     />

                     <p className="appearance-none block   bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                        {count}كود
                     </p>
                  </div>
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="price"
                  >
                     السعر
                  </label>
                  <input
                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="price"
                     type="number"
                     placeholder="سعر البطاقة"
                     value={price}
                     onChange={handlePriceChange}
                  />
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <label
                     className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                     htmlFor="photo"
                  >
                     صورة
                  </label>
                  <input
                     className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                     id="photo"
                     type="file"
                     placeholder="صورة البطاقة"
                     value={photo}
                     onChange={handlePhotoChange}
                  />
               </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
               <div className="w-full px-3 mb-6 md:mb-0">
                  <table className="table-auto">
                     <thead>
                        <tr>
                           <th className="px-4 py-2">الكود</th>
                           <th className="px-4 py-2">البيانات</th>
                           <th className="px-4 py-2"></th>
                        </tr>
                     </thead>
                     <tbody>
                        {codes.map((code, index) => (
                           <tr key={index}>
                              <td className="border px-4 py-2">
                                 <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="code"
                                    placeholder="الكود"
                                    value={code.code}
                                    onChange={(e) => handleCodeChange(e, index)}
                                 />
                              </td>
                              <td className="border px-4 py-2">
                                 <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="data"
                                    placeholder="البيانات"
                                    value={code.data}
                                    onChange={(e) => handleCodeChange(e, index)}
                                 />
                              </td>
                              <td className="border px-4 py-2">
                                 <button
                                    type="button"
                                    onClick={() => handleDeleteCode(index)}
                                 >
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       className="h-6 w-6 text-red-500"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"
                                       />
                                    </svg>
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <button
                     type="button"
                     onClick={handleAddCode}
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                     إضافة كود
                  </button>
               </div>
            </div>
            <div className="flex items-center justify-center">
               <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  type="submit"
               >
                  إرسال
               </button>
            </div>
         </form>
      </div>
   );
};

export default CardService;
