import { useState, useEffect, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import { FaSort } from "react-icons/fa";


import { debounce } from "../../helper/debounce";
import SearchBar from "../../components/searchBar/SearchBar";
import { useAppSelector, useAppDispatch } from "../../store/store";
import PostItem from "./PostItem";
import "./postPage.css";
import PostForm from "../../components/postForm/PostForm";
import { setIsOpenPostModal } from "./postSlice";
import useSortBy from "../../hooks/useSortBy";

export default function PostsPage() {
  const { posts, loading, isOpenPostModal } = useAppSelector(
    (state) => state.posts
  );
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPost, setFilteredPost] = useState<any>(posts);

  const { sortableItems, requestSort } = useSortBy(filteredPost);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const optimizeDebounce = useCallback(debounce(handleChange, 500), []);

  useEffect(() => {
    const searchByContent = posts?.filter((it) => {
      let temp = it.title + " " + it.subTitle;
      if (temp.toLowerCase().includes(searchTerm.toLowerCase())) {
        return it;
      }
      return null;
    });
    setFilteredPost(searchByContent);
  }, [posts, searchTerm]);

  return (
    <div className="posts_container">
      <span className="posts_title">Post Page</span>

      <div className="posts_list">
        <SearchBar handleChange={optimizeDebounce} />
        <DropdownButton
          id="dropdown-basic-button"
          size="sm"
          variant="light"
          title="sort By"
        >
          <Dropdown.Item onClick={() => requestSort("createdAt")}>
            Created <FaSort size="15px" />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => requestSort("updatedAt")}>
            Updated <FaSort size="15px" />
          </Dropdown.Item>
          <Dropdown.Item onClick={() => requestSort("status")}>
            Status <FaSort size="15px" />
          </Dropdown.Item>
        </DropdownButton>
        <Button
          className="d-gridd"
          variant="light"
          size="lg"
          onClick={() => dispatch(setIsOpenPostModal(true))}
        >
          Add a Post
        </Button>
        <div className="buttons_sortby"></div>
        {isOpenPostModal ? <PostForm /> : null}
        <div className="postss_container">
          {sortableItems?.length > 0 &&
            sortableItems?.map((post: any) => {
              return <PostItem key={post._id} post={post} />;
            })}
        </div>
        {loading ? (
          <div style={{ margin: "auto auto", scale: "2" }}>
            <Spinner variant="light" animation="border" />
            <Spinner variant="light" animation="border" />
            <Spinner variant="light" animation="grow" />
            <Spinner variant="light" animation="grow" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
