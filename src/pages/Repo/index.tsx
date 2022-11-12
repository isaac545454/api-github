import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

interface Repo {
  name: string;
  description: string;
  login: string;
}

interface Issue {
  id: number;
  labels: { id: number; name: string; map: any };
  user: {
    title: string;
    avatar_url: string;
    login: string;
  };
  html_url: string;

  title: string;
}
interface Label {
  id: number;
  name: string;
}

export default function index({ match }: any) {
  const { repo } = useParams();
  const [Repo, setRepo] = useState<Repo>({
    name: "",
    description: "",
    login: "",
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [Image, setImage] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("open");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const issues = async () => {
      const data = await api.get(`/repos/${repo}/issues`, {
        params: {
          state: filter,
          page,
          per_page: 5,
        },
      });
      setIssues(data.data);
    };

    issues();
  }, [page, filter]);

  const load = async () => {
    setLoading(true);
    const [repoData, issuesData] = await Promise.all([
      api.get(`/repos/${repo}`),
      api.get(`/repos/${repo}/issues`, {
        params: {
          state: filter,
          page,
          per_page: 5,
        },
      }),
    ]);
    setRepo(repoData.data);
    setImage(repoData.data.owner.avatar_url);
    setIssues(issuesData.data);

    setLoading(false);
  };

  const handleClick = (action: string) => {
    if (page === 1 && action === "anterior")
      return alert("essa é a primeira pagina");
    setPage(action === "proxima" ? page + 1 : page - 1);
  };

  if (loading) {
    return (
      <div className="text-white text-[30px] flex items-center justify-center">
        Carregando...
      </div>
    );
  }

  return (
    <div className="max-w-[700px] bg-white rounded shadow p-9 mx-auto my-20  max-[480px]:-my-4">
      <Link to="/">
        <FaArrowLeft color="black" size={35} className="" />
      </Link>
      <div className="flex flex-col items-center justify-center">
        <img src={Image} alt={Repo.login} className="w-40 rounded-[20%] my-5" />
        <h1 className="text-[#0d2636] text-3xl font-bold">{Repo.name}</h1>
        <p className="my-2 text-sm max-w-[400px] text-center">
          {Repo.description}
        </p>
      </div>
      <div className="flex justify-around mt-6">
        <button
          className="bg-[#222] px-6 py-1 text-white rounded"
          onClick={() => setFilter("open")}
        >
          open
        </button>
        <button
          className="bg-[#222] px-6 py-1 text-white rounded"
          onClick={() => setFilter("closed")}
        >
          closed
        </button>
        <button
          className="bg-[#222] px-6 py-1 text-white rounded"
          onClick={() => setFilter("all")}
        >
          all
        </button>
      </div>
      <ul className="mt-8 pt-8 border-t-[1px] border-[#ddd] list-none max-[480px]:mt-4">
        {issues.map((i: Issue) => (
          <li
            key={String(i.id)}
            className="flex py-4 px-3 mt-2 max-[480px]:mt-1 max-[480px]:justify-center"
          >
            <img
              src={i.user.avatar_url}
              alt={i.user.avatar_url}
              className="w-9 h-9 rounded-[50%]"
            />
            <div className="flex-1 ml-3">
              <strong className="text-base flex flex-col max-[480px]:max-w-[250px]">
                <a
                  href={i.html_url}
                  className="text-[#222] hover:text-[#0071db] max-[480px]:max-w-[200px] "
                >
                  {i.title}
                </a>
                {i.labels.map((label: Label) => (
                  <span
                    key={String(label.id)}
                    className="bg-[#222] max-w-[300px] font-bold rounded text-white  px-2 mt-2 py-1 max-[480px]:max-w-[200px]"
                  >
                    {label.name}
                  </span>
                ))}
              </strong>
              <p>{i.user.login}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center m-6 ">
        <button
          className="bg-[#222] px-5 py-2 text-white rounded"
          onClick={() => handleClick("anterior")}
        >
          voltar
        </button>
        <button
          className="bg-[#222] px-5 py-2 text-white rounded"
          onClick={() => handleClick("proxima")}
        >
          proxima
        </button>
      </div>
    </div>
  );
}
