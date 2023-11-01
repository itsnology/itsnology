import React from "react";
import SideBar from "@components/sidebar";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");
const records = await pb.collection("users").getFullList({
  sort: "-created",
});

console.log(records);

const users = () => {
  const tableItems = [
    {
      name: "ليام جيمس",
      email: "liamjames@example.com",
      position: "مهندس برمجيات",
      salary: "$100K",
    },
    {
      name: "أوليفيا إيما",
      email: "oliviaemma@example.com",
      position: "مصمم المنتج",
      salary: "$90K",
    },
    {
      name: "وليام بنيامين",
      email: "william.benjamin@example.com",
      position: "مطور الواجهة الأمامية",
      salary: "$80K",
    },
    {
      name: "هنري ثيودور",
      email: "henrytheodore@example.com",
      position: "مهندس Laravel",
      salary: "$120K",
    },
    {
      name: "اميليا ايليا",
      email: "amelia.elijah@example.com",
      position: "مدير Open source",
      salary: "$75K",
    },
  ];

  return (
    <div className="flex md:flex-row ">
      <SideBar />
      <div className="max-w-screen-lg basis-1/2 justify-end mx-auto md:mt-6 lg:mt-6 mt-12 ">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Users Informations
          </h3>
        </div>
        <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
          <table className="w-full table-auto text-sm text-right">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {records.map((item, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default users;
