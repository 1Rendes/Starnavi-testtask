import { useEffect } from "react";
import CharacterList from "../components/CharactersList/CharactersList";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreButton from "../components/LoadMoreButton/LoadMoreButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectHomePageEndpoint,
  selectNext,
  selectPage,
  selectRenderData,
} from "../redux/selectors";
import { getOnePageList } from "../redux/operations";
import { resetData, setPage } from "../redux/slice";
import { AppDispatch } from "../redux/store";
import Container from "../components/Container/Container";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const renderData = useSelector(selectRenderData);
  const endpoint = useSelector(selectHomePageEndpoint);
  const error = useSelector(selectError);
  const next = useSelector(selectNext);

  useEffect(() => {
    dispatch(resetData());
  }, []);

  useEffect(() => {
    const values = { endpoint, page };
    dispatch(getOnePageList(values));
  }, [page]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  }, [renderData]);

  const loadMoreHandle = () => {
    dispatch(setPage());
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Container>
      {renderData && <CharacterList charactersList={renderData} />}
      <Toaster />
      {next && <LoadMoreButton onClick={loadMoreHandle} />}
    </Container>
  );
};

export default HomePage;
