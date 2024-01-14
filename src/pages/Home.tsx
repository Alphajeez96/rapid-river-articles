import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Article {
  body: string;
  id: number;
  title: string;
  userId: number;
  author: string;
  createdAt: number;
}

interface Author {
  name: string;
  id: number;
}

const CardSkeleton: React.FC = () => {
  return (
    <div className="feeds-card animate-pulse">
      <div className="bg-gray-300 h-72 w-full rounded-t-2xl"></div>
      <div className="p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-3 bg-gray-300 my-4 rounded-sm"></div>
        ))}

        <div className="flex">
          <div className="h-3 w-24 bg-gray-300 my-4 rounded-sm"></div>
          <div className="ml-auto h-3 w-20 bg-gray-300 my-4 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="feeds-card">
      <img src="https://cdn.pixabay.com/photo/2017/09/23/16/11/compass-2779371_1280.jpg" alt="news" />

      {children}
    </div>
  );
};

const Home: React.FC = () => {
  let content;
  const [loading, setLoading] = useState(true);
  const [searchQuery, setsearchQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

  const truncateText = (value: string, length: number = 50): string =>
    value && value.length > length ? value.substring(0, length) + '...' : value;

  const fetchArticles = async () => {
    try {
      const [articlesResponse, authorsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users'),
      ]);

      const [articles, authors] = await Promise.all([articlesResponse.json(), authorsResponse.json()]);
      const mappedArticles: Article[] = articles.map((article: Article) => ({
        ...article,
        author: authors.find((author: Author) => author.id === article.userId)?.name || '',
        createdAt: Math.floor(Math.random() * 24) + 1,
      }));

      setArticles(mappedArticles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    const filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  if (loading) {
    content = Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />);
  } else if (filteredArticles.length) {
    content = filteredArticles.map((article: Article) => (
      <Card key={article.id}>
        <div className="p-4">
          <p className="text"> {truncateText(article.title)}</p>
          <p className="text pt-4">{truncateText(article.body, 150)}</p>

          <div className="flex items-center pt-4">
            <p className="text-sm font-semibold text-primary-grey">{article.author}</p>

            <div className="ml-auto flex items-center gap-2">
              <span className="time-dot"></span>
              <p className="text-xs font-medium text-primary-grey">
                {' '}
                {`${article.createdAt} ${article.createdAt > 1 ? 'hours' : 'hour'} ago`}{' '}
              </p>
            </div>
          </div>
        </div>
      </Card>
    ));
  } else {
    content = <p className="empty-text">No articles found</p>;
  }

  return (
    <section className="feeds-holder">
      <div className="flex">
        <aside className="flex items-center gap-3 w-1/3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by author or title"
              className="input search-input"
              value={searchQuery}
              onChange={(e) => setsearchQuery(e.target.value)}
            />
            <span className="absolute top-[10px] left-4">
              <img src="/src/assets/images/search.svg" alt="search-icon" />
            </span>
          </div>
        </aside>

        <div className="ml-auto">
          {' '}
          <Link to="/new">
            {' '}
            <button className="button">Create article</button>{' '}
          </Link>
        </div>
      </div>

      <div className="inner-holder transparent-scrollbar">{content}</div>
    </section>
  );
};

export default Home;
