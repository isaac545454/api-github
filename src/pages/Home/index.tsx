import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function index() {
  return (
    <div className="">
      <div className="max-w-[700px]  bg-white rounded p-8 mt-20 mx-auto">
        <h1 className="text-xl flex  items-center">
          <FaGithub size={25} className="mr-2" />
          indaaaaaaaaaaaaaaaaaaaaaaex
        </h1>
        <form className="mt-8 flex flex-row">
          <input
            type="text"
            placeholder="Adicionar repositorio"
            className="flex-1 border-[#ddd] border-[4px] text-lg rounded-md g px-4 py-3"
          />
          <button className="bg-[#0d2636] rounded ml-3 py-0 px-5 flex items-center justify-center">
            <FaPlus color="#fff" size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
