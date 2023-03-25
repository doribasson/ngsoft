import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Post, PostState, formInterface } from "../../interfaces/Post";

const initialState: PostState = {
  posts: [],
  isOpenPostModal: false,
  loading: false,
  errors: [],
};

export const getPosts = createAsyncThunk<Post[]>(
  "posts/getPosts",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/api/posts");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data: formInterface, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/posts", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/posts/${data.id}`, data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `api/posts/comment/${data.postId}`,
        data.data
      );
      return { data: response.data, postId: data.postId };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (comment: any) => {
    try {
      const response = await axios.delete(
        `/api/posts/comment/${comment.postId}/${comment._id}`
      );
      return { data: response.data, comment };
    } catch (error) {}
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },

    setIsOpenPostModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenPostModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    //get post
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    //create post
    builder.addCase(addPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state: any, action) => {
      state.posts = [...state.posts, action.payload];
      state.loading = false;
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    //edit post
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state: any, action) => {
      state.loading = false;
      if (action.payload._id) {
        state.posts = state.posts.map((post: any) =>
          post._id === action.payload._id ? action.payload : post
        );
      }
    });

    builder.addCase(editPost.rejected, (state, action: any) => {
      state.loading = false;
      state.errors = action.payload.data.message;
    });

    //delete post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state: any, action) => {
      state.loading = false;
      if (action.payload) {
        state.posts = state.posts.filter(
          (post: Post) => post._id !== action.payload.id
        );
      }
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    //create commnet from post
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state: any, action) => {
      const findIndex = state.posts.findIndex(
        (post: Post) => post._id === action.payload.postId
      );
      state.posts[findIndex].comments = action.payload.data;
      state.loading = false;
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    //delete commnet from post
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state: any, action) => {
      state.loading = false;
      const {
        comment: { postId, _id },
      }: any = action.payload;
      const findPostIndex = state.posts.findIndex(
        (post: Post) => post._id === postId
      );
      const findCommentIndex = state.posts[findPostIndex].comments.findIndex(
        (comm: any) => comm._id === _id
      );
      state.posts[findPostIndex].comments.splice(findCommentIndex, 1);
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { setPosts, setIsOpenPostModal } = postSlice.actions;
