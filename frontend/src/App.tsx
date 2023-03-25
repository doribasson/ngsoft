import { useCallback, useEffect } from "react";
import PostsPage from "./features/post/PostPage";
import { getPosts } from "./features/post/postSlice";
import { useAppDispatch } from "./store/store";

function App() {
  
  const dispatch = useAppDispatch();

  const initApp = useCallback(async () => {
    await dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <div className="App">
      <PostsPage />
    </div>
  );
}

export default App;
