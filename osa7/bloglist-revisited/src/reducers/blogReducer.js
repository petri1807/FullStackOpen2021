import blogService from '../services/blogs';

export const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'NEW_BLOG':
      return [...state, action.data];
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
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: `A new blog ${newBlog.title} added`,
      });
    } else {
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: 'Something went wrong',
      });
    }
  };
};
