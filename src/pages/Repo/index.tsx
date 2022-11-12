import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";

export default function index({ match }: any) {
  const { repo } = useParams();
  const [details, setDetail] = useState("");
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const [repoData, issuesData] = await Promise.all([
      api.get(`/repos/${repo}`),
      api.get(`/repos/${repo}/issues`),
    ]);
    console.log(repoData.data);
    console.log(issuesData.data);
  };

  return <div className="text-[10px] text-white">{repo}</div>;
}
