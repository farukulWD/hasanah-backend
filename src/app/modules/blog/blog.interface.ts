export interface IBlogPost extends Document {
  _id?: string;
  title: string;
  content: string;
  author?: string;
  coverImage?: string;
  tags?: string[];
  isPublish?:boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
