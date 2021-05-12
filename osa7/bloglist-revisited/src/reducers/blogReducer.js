import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'LIKE':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog
      );
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.data.id);
    case 'NEW_COMMENT':
      return state.map((blog) =>
        blog.id === action.data.id
          ? { ...blog, comments: [...blog.comments, action.data.comment] }
          : blog
      );
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const createNewBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    if (newBlog) {
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });
      dispatch(setNotification(`A new blog ${newBlog.title} added`, 5));
    } else {
      dispatch(setNotification(newBlog.error, 5));
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    const updatedBlog = await blogService.update(newBlog);
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const deletedBlog = await blogService.erase(blog.id);
    console.log(deletedBlog);
    dispatch({
      type: 'DELETE',
      data: blog,
    });
    dispatch(setNotification(`Deleted ${blog.title} by ${blog.author}`, 5));
  };
};

export const createNewComment = (id, comment) => {
  return async (dispatch) => {
    const responseComment = await blogService.createComment(id, comment);
    dispatch({
      type: 'NEW_COMMENT',
      data: {
        id,
        comment: responseComment,
      },
    });
  };
};
