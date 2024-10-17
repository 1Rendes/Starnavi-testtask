import { useEffect, useState } from "react";
import ActorsList from "../components/ActorsList";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreButton from "../components/LoadMoreButton";
import { useFetch } from "../hooks/useFetch";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [renderData, setRenderData] = useState([]);
  const homePageEndpoint = "people/";
  const { data, error } = useFetch(homePageEndpoint, page);

  useEffect(() => {
    if (!error) return;
    toast.error(error.message);
  }, [error]);

  console.log(data);

  useEffect(() => {
    if (!data) return;
    setRenderData((prevData) => {
      return [...prevData, ...data.results];
    });
  }, [data]);

  const loadMoreHandle = () => {
    const newPage = page + 1;
    console.log(page);
    setPage(newPage);
  };

  return (
    <div>
      {data && <ActorsList actorsList={renderData} />}
      <Toaster />
      <LoadMoreButton onClick={loadMoreHandle} />
    </div>
  );
};

export default HomePage;
