import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlicer";
import { toast } from "react-toastify";
import { FormateDate } from "../utility/formatDate";
import { Calendar, Copy, Eye, PenLine, Trash2 } from "lucide-react";


const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes[0]);

  const [searchBar, setSearchBar] = useState("");

  const dispatch = useDispatch();

  const filterData = pastes.filter((items) =>
    items.title.toLowerCase().includes(searchBar.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy() { }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">

        <div className="w-full flex flex-col gap-3 px-4 py-4 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
          <input
            className="focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="Search note here..."
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />
        </div>

        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
            All Notes
          </h2>
          <div className="w-full px-4 flex flex-col gap-y-5 pt-4 ">
            {filterData.length > 0 ? (
              filterData.map((paste) => (
                <div className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]" key={paste._id}>
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{paste.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">{paste.content}</p>
                  </div>

                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">


                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500"
                      >
                        <a href={`/?pasteId=${paste?._id}`}>
                        <PenLine
                          className="text-black group-hover:text-blue-500"
                          size={20}
                        />
                        </a></button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500"
                      >
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                        <Eye className="text-black group-hover:text-orange-500"
                        size={20}
                        />
                        </a></button>

                      <button 
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                      onClick={() => handleDelete(paste._id)}>
                        <Trash2 className="text-black group-hover:text-pink-500"
                        size={20}
                        />
                        </button>



                      <button
                      className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(paste.content);
                          toast.success("Copied Successfully");
                        }}
                      >
                        <Copy className="text-black group-hover:text-green-500"
                        size={20}
                        />
                      </button>
                    </div>
                    <div className="gap-x-2 flex">
                      <Calendar className="text-black" size={20} />
                      {FormateDate(paste.createAt)}</div>
                  </div>
                </div>
              ))) : <div className="text-2xl text-center w-full text-chileanFire-500">
              No Data Found
            </div>}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Pastes;
