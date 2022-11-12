import React, { useState, useCallback, useEffect } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";

interface Repo {
  name: string;
}

export default function index() {
  const [Input, setInput] = useState<string>("");
  const [repo, setRepo] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (Input === "") return;
      const hashRepo = repo.find((r) => r.name === Input);
      if (hashRepo) {
        return alert("esse repositorio ja foi adicionado");
      }

      async function submit() {
        setLoading(true);

        try {
          const res = await api.get(`repos/${Input}`);

          const data = {
            name: res.data.full_name,
          };
          setRepo([...repo, data]);
          saveItem([...repo, data]);
          setInput("");
        } catch (error) {
          alert("ops... repositorio não econtrado");
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [repo, Input]
  );

  const handleDelete = useCallback(
    (rep: string) => {
      const find = repo.filter((r) => r.name !== rep);
      setRepo(find);
      saveItem(find);
    },
    [repo]
  );

  useEffect(() => {
    const repoStorage = localStorage.getItem("repos");

    if (repoStorage === []) return;
    setRepo(JSON.parse(repoStorage));
  }, []);

  const saveItem = (r: Repo[]) => {
    localStorage.setItem("repos", JSON.stringify(r));
  };

  return (
    <>
      <div className="max-w-[700px]  bg-white rounded p-8 mt-20 mx-auto max-[480px]:mt-[-14px]">
        <h1 className="text-xl flex  items-center font-bold">
          <FaGithub size={25} className="mr-2" />
          Repositorios
        </h1>
        <form className="mt-8 flex flex-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            className="flex-1 border-[#ddd] border-[4px] text-lg rounded-md g px-4 py-3"
            value={Input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          {loading === false ? (
            <button
              type="submit"
              className="bg-[#0d2636] rounded ml-3 py-0 px-5 flex items-center justify-center'"
            >
              <FaPlus color="#fff" size={14} />
            </button>
          ) : (
            <button
              className="bg-[#262b2e] rounded ml-3 opacity-50 py-0 px-5 flex items-center cursor-not-allowed justify-center
              "
              disabled
            >
              <FaSpinner color="#fff" size={14} className="animate-spin" />
            </button>
          )}
        </form>
        <ul className="mt-5">
          {repo.map((rep) => (
            <li
              key={rep.name}
              className="list-none flex justify-between items-center border-b-[1px] border-[#000] mt-2"
            >
              <span className="pb-3 font-bold">
                <button className="mr-3" onClick={() => handleDelete(rep.name)}>
                  <FaTrash />
                </button>
                {rep.name}
              </span>
              <Link to={`repo/${encodeURIComponent(rep.name)}`}>
                <FaBars size={20} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
