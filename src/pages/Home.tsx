import React, { useEffect, useState } from 'react';

interface Article {
  body: string;
  id: number;
  title: string;
  userId: number;
}

interface Author {
  name: string;
  id: number;
}

const CardSkeleton = () => {
  return (
    <div className=" feeds-card">
      <div className="animate-pulse">
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
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);

  // const cardsArray = Array.from({ length: 6 });
  const truncateText = (value: string, length: number = 50): string =>
    value && value.length > length ? value.substring(0, length) + '...' : value;

  const retrieveAuthor = (id: number): Author | undefined => {
    return authors.find((author) => author.id === id);
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
      const response2 = await fetch('https://jsonplaceholder.typicode.com/users');

      const data2 = await response2.json();
      const mapped = data2.map((data: Author) => {
        return {
          name: data.name,
          id: data.id,
        };
      });

      setAuthors(mapped);

      console.log('YY', mapped);

      const data = await response.json();
      setArticles(data);
      console.log('RESP::', data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <section className="feeds-holder">
      <div className="flex">
        <aside className="flex items-center gap-3 w-1/3">
          <div className="relative w-full">
            <input className="search-input" type="text" placeholder="Search by author or title" />
            <span className="absolute top-[10px] left-4">
              <img src="/src/assets/images/search.svg" alt="search-icon" />
            </span>
          </div>

          <button className="button">Search</button>
        </aside>

        <div className="ml-auto">
          {' '}
          <button className="button">Create article</button>
        </div>
      </div>

      <div className="inner-holder transparent-scrollbar">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <CardSkeleton key={index} />)
          : articles.map((article: Article) => {
              const timeSlot: number = Math.floor(Math.random() * 24) + 1;

              return (
                <Card key={article.id}>
                  <div className="p-4">
                    <p className="text"> {truncateText(article.title)}</p>
                    <p className="text pt-4">{truncateText(article.body, 160)}</p>

                    <div className="flex items-center pt-4">
                      <p className="text-sm font-semibold text-primary-grey">{retrieveAuthor(article.userId)?.name}</p>

                      <div className="ml-auto flex items-center gap-2">
                        <span className="time-dot"></span>
                        <p className="text-xs font-medium text-primary-grey">
                          {' '}
                          {`${timeSlot} ${timeSlot > 1 ? 'hours' : 'hour'} ago`}{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
      </div>
    </section>
  );
};

export default Home;
