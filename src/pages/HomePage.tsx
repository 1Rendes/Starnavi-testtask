import { useEffect } from "react";
import CharacterList from "../components/CharactersList";
import toast, { Toaster } from "react-hot-toast";
import LoadMoreButton from "../components/LoadMoreButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectHomePageEndpoint,
  selectPage,
  selectRenderData,
} from "../redux/selectors";
import { getOnePageList } from "../redux/operations";
import { resetData, setPage } from "../redux/slice";
import { AppDispatch } from "../redux/store";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage);
  const renderData = useSelector(selectRenderData);
  const endpoint = useSelector(selectHomePageEndpoint);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(resetData());
  }, [dispatch]);

  useEffect(() => {
    const values = { endpoint, page };
    dispatch(getOnePageList(values));
  }, [dispatch, endpoint, page]);

  const loadMoreHandle = () => {
    dispatch(setPage());
  };
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div>
      {renderData && <CharacterList charactersList={renderData} />}
      <Toaster />
      <LoadMoreButton onClick={loadMoreHandle} />
    </div>
  );
};

export default HomePage;
