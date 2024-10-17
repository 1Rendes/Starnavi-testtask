import { useEffect, useState } from "react";
import CharacterList from "../components/CharactersList";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreButton from "../components/LoadMoreButton";
import { fetchData } from "../api/fetchData";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [renderData, setRenderData] = useState([]);
  const homePageEndpoint = "people/";

  useEffect(() => {
    const getOnePageList = async () => {
      const onePageList = await fetchData(homePageEndpoint, null, null, page);
      setData(onePageList);
    };
    getOnePageList();
  }, [page]);

  useEffect(() => {
    if (data instanceof Error) toast.error(data.message);
    return;
  }, [data]);

  useEffect(() => {
    if (!data.results) return;
    setRenderData((prevData) => {
      return [...prevData, ...data.results];
    });
  }, [data]);

  const loadMoreHandle = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <div>
      {data && <CharacterList charactersList={renderData} />}
      <Toaster />
      <LoadMoreButton onClick={loadMoreHandle} />
    </div>
  );
};

export default HomePage;
