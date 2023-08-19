import React, { useContext, useState, useEffect } from "react";
import { Card, Image, Grid, Pagination } from "semantic-ui-react";
import { TopNewsContext } from "../context/Topnewscontext";

const limit = 10;
const Cards = ({ country, handleClick }) => {
  const [currentPageNews, setCurrentPageNews] = useState([]);
  const { news, searchNews } = useContext(TopNewsContext);
  useEffect(() => {
    console.log(searchNews);
    if (searchNews.length > 0 && !  country) {
      setCurrentPageNews(searchNews.slice(0, 10));
    } else {
      setCurrentPageNews(news.slice(0, 10));
    }
  }, [news, searchNews]);

  const handlePageChange = (e, { activePage }) => {
    console.log(activePage);
    if (country) {
      setCurrentPageNews(
        news.slice((activePage - 1) * limit, activePage * limit)
      );
    } else {
      setCurrentPageNews(
        searchNews.slice((activePage - 1) * limit, activePage * limit)
      );
    }
  };

  return (
    <>
      {country ? (
        <h1>
          Top News{" "}
          {country === "gb" ? "Great Britain" : "United State of America"}
        </h1>
      ) : (
        <h1>Search News</h1>
      )}
      <Grid columns="three" divided>
        <Grid.Row>
          {currentPageNews.map((newsDetail, i) => (
            <Grid.Column key={i}>
              <Card onClick={() => handleClick(newsDetail)}>
                <Image src={newsDetail.urlToImage} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{newsDetail.title}</Card.Header>
                  <Card.Meta>
                    <span className="date">{newsDetail.publishedAt}</span>
                  </Card.Meta>
                  <Card.Description>{newsDetail.description}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <div style={{ marginTop: 20 }}>
        <Pagination
          defaultActivePage={1}
          totalPages={news.length / limit}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default Cards;
