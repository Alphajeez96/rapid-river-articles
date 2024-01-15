/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home';

window.fetch = vi.fn();

function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe('Renders the Home page', () => {
  test('snapshot', () => {
    const comp = render(
      <Router>
        <Home />
      </Router>,
    );
    expect(comp).toMatchSnapshot();
  });

  test('fetches articles', async () => {
    vi.useFakeTimers();
    const mockArticles = [
      {
        id: 1,
        title: 'Test Article',
        body: 'This is a test article.',
        userId: 1,
      },
    ];

    window.fetch.mockResolvedValueOnce(createFetchResponse(mockArticles));
    render(
      <Router>
        <Home />
      </Router>,
    );

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
  });
});
