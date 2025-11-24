import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, resetAllPastes, updateToPastes } from '../redux/pasteSlicer';
import { PlusCircle , Copy} from "lucide-react";
import { toast } from 'react-toastify';


const Home = () => {

  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');

  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");

  const dispatch = useDispatch();

  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((item) => item?._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParam({});
  }


  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    }

    if (pasteId) {
      // update
      dispatch(updateToPastes(paste));
    }
    else {
      //creation 
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParam("");
  }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 relative top-6">
      <div className="flex flex-col gap-y-4 items-start">
        <div className='w-full flex flex-row gap-x-4 justify-between items-center'>
          <input
            className={`${pasteId ? "w-[80%]" : "w-[85%]"} text-black border border-input rounded-md p-2`}
            type="text" placeholder='Enter title here..'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createPaste}
            className='w-[20%] p-2 border-black text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700'>
            {
              pasteId ? "Update Note" : "Create New Note"
            }
          </button>

          {pasteId && <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={resetPaste}
          >
            <PlusCircle size={20} />
          </button>}
        </div>

        <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
          <div className="w-full rounded-t flex flex-col items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">

            <div className="w-full flex gap-x-[6px] justify-between items-center group">
              <div className=" flex gap-x-[6px] select-none">
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]"></div>
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,188,46)]"></div>
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]"></div>

              </div>
              <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
                <button
                  className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                  onClick={() => {
                    navigator.clipboard.writeText(value);
                    toast.success("Copied to Clipboard", {
                      position: "top-right",
                    });
                  }}
                >
                  <Copy className="group-hover:text-sucess-500" size={20} />
                </button>
              </div>
            </div>
            <textarea
              className='w-full mt-3 p-3 focus-visible:ring-0'
              value={value}
              placeholder='Write Your Content Here..'
              rows={20}
              onChange={(e) => setValue(e.target.value)}
              style={{
                caretColor: '#000',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home