import React, { useEffect } from 'react';

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="feeds-card">
      <img src="https://cdn.pixabay.com/photo/2017/09/23/16/11/compass-2779371_1280.jpg" alt="news" />

      {children}
    </div>
  );
};

const Home: React.FC = () => {
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then((response) => response.json())
      .then((json) => console.log(json));
  }, []);

  const cardsArray = Array.from({ length: 6 });

  return (
    <section className="feeds-holder">
      <div className="flex">
        <aside className="flex items-center gap-3 w-1/3">
          <input type="text" placeholder="Search" />
          <button className="button px-5">Search</button>
        </aside>

        <div className="ml-auto">
          {' '}
          <button className="button px-5">Create article</button>
        </div>
      </div>

      <div className="inner-holder transparent-scrollbar">
        {cardsArray.map((_, index) => {
          const timeSlot: number = Math.floor(Math.random() * 24) + 1;

          return (
            <Card key={index}>
              <div className="p-4">
                {/* Title Here */}
                <p className="text">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</p>

                {/* Body Here */}
                <p className="text pt-4">sunt aut facere repellat provident occaecati excepturi optio reprehenderit</p>

                <div className="flex pt-4">
                  <div className="flex items-center gap-2">
                    <span className="time-dot"></span>
                    <p className="text-xs font-medium text-primary-grey">
                      {' '}
                      {`${timeSlot} ${timeSlot > 1 ? 'hours' : 'hour'} ago`}{' '}
                    </p>
                  </div>
                  <span className="ml-auto">
                    <img src="/src/assets/images/caret-right.svg" alt="caret" />
                  </span>
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
