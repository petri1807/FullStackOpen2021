import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Blog } from './Blog';

const blog = {
  title: 'Test title',
  author: 'Test author',
  url: 'http://testurl.com',
  likes: 0,
  user: {
    username: 'mattiesko',
    name: 'Matti Esko',
  },
};

const user = {
  username: 'testuser',
  name: 'test dummy',
};

describe('<Blog /> renders', () => {
  test('title and author at start, not url or likes ', () => {
    const { getByText, queryByText } = render(<Blog blog={blog} />);

    expect(getByText('Test title')).toBeInTheDocument();
    expect(getByText('Test author')).toBeInTheDocument();

    expect(queryByText('http://testurl.com')).toBeNull();
    expect(queryByText('likes 0')).toBeNull();
  });

  test('full info when view button is pressed ', () => {
    const { getByText } = render(<Blog blog={blog} user={user} />);
    fireEvent.click(getByText('View'));

    expect(getByText('Test title')).toBeInTheDocument();
    expect(getByText('Test author')).toBeInTheDocument();
    expect(getByText('http://testurl.com')).toBeInTheDocument();
    expect(getByText('Likes 0')).toBeInTheDocument();
  });
});

describe('<Blog /> calls', () => {
  test('likeHandler twice when like button is clicked twice', () => {
    const handler = jest.fn();

    const { getByRole } = render(
      <Blog blog={blog} user={user} likeHandler={handler} />
    );

    fireEvent.click(getByRole('button', { name: 'View' }));
    fireEvent.click(getByRole('button', { name: 'like' }));
    fireEvent.click(getByRole('button', { name: 'like' }));

    expect(handler.mock.calls).toHaveLength(2);
  });
});
