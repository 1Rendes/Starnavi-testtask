import { useEffect } from "react";
import CharacterList from "../components/CharactersList";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreButton from "../components/LoadMoreButton";
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
import Container from "../components/Container";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const renderData = useSelector(selectRenderData);
  const endpoint = useSelector(selectHomePageEndpoint);
  const error = useSelector(selectError);
  const next = useSelector(selectNext);

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  useEffect(() => {
    const values = { endpoint, page };
    dispatch(getOnePageList(values));
  }, [dispatch, endpoint, page]);

  useEffect(() => {
    if (page === 1) return;
    window.scrollBy({
      top: 500,
      behavior: "smooth",
    });
  }, [renderData, page]);

  const loadMoreHandle = () => {
    if (!next) {
      toast.error("That's all of them.");
      return;
    }
    dispatch(setPage());
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <Container>
      {renderData && <CharacterList charactersList={renderData} />}
      <Toaster />
      <LoadMoreButton onClick={loadMoreHandle} />
    </Container>
  );
};

export default HomePage;
