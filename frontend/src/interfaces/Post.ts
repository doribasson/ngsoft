export interface Post {
  _id: string;
  title: string;
  subTitle: string;
  status: string;
  comments: [];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface formInterface {
  _id?: string | undefined;
  title: string | undefined;
  subTitle: string | undefined;
  status: string | undefined;
  id?: string | undefined;
}

export interface PostState {
  posts: Post[] | null;
  loading: boolean;
  errors: any;
  isOpenPostModal: boolean;
}
