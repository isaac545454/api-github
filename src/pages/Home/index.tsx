import React from "react";
import { FaGithub, FaPlus } from "react-icons/fa";

export default function index() {
  return (
    <div className="max-w-[700px] flex flex-col items-center bg-white rounded p-8 pt-10 mx-auto">
      <h1 className="text-">
        <FaGithub size={25} />
        indaaaaaaaaaaaaaaaaaaaaaaex
      </h1>
      <form>
        <input type="text" placeholder="Adicionar repositorio" />
        <button>
          <FaPlus color="#fff" size={14} />
        </button>
      </form>
    </div>
  );
}
