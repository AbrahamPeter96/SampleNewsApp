import React, { useState, useContext, useEffect } from "react";
import {
  Input,
  Menu,
  Segment,
  Form,
  Radio,
  Button,
  Image,
} from "semantic-ui-react";
import Cards from "./Card";
import { TopNewsContext } from "../context/Topnewscontext";
const Tabs = () => {
  const { topNews, searchByTitle } = useContext(TopNewsContext);

  const [activeItem, setActiveItem] = useState("Top News");
  const [activeRadio, setActiveRadio] = useState("gb");
  const [selectedNews, setSelectedNews] = useState();
  const [searchTitle, setSearchTitle] = useState("");

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleChange = (e, { value }) => setActiveRadio(value);
  const handleSearchChange = (e) => setSearchTitle(e.target.value);
  const handleNewsClick = (newsDetail) => setSelectedNews(newsDetail);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    searchByTitle(searchTitle);
    setSearchTitle("");
  };

  useEffect(() => {
    topNews(activeRadio);
  }, [activeRadio]);

  return (
    <div>
      <Menu pointing>
        <Menu.Item
          name="Top News"
          active={activeItem === "Top News"}
          onClick={handleItemClick}
        ></Menu.Item>
        <Menu.Item
          name="Categories"
          active={activeItem === "Categories"}
          onClick={handleItemClick}
        />
        <Menu.Item
          name="Search"
          active={activeItem === "Search"}
          onClick={handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <div>
              <Form>
                <Form.Field>
                  <Radio
                    label="GB"
                    name="radioGroup"
                    value="gb"
                    checked={activeRadio === "gb"}
                    onChange={handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="US"
                    name="radioGroup"
                    value="us"
                    checked={activeRadio === "us"}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form>
            </div>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {selectedNews ? (
        <>
          <Button onClick={() => setSelectedNews(null)}>{"<-Back"}</Button>

          <h1>{selectedNews.title}</h1>
          <Image src={selectedNews.urlToImage} wrapped ui={false} />
          <p>{selectedNews.content}</p>
        </>
      ) : activeItem === "Top News" ? (
        <Segment>
          <Cards country={activeRadio} handleClick={handleNewsClick} />
        </Segment>
      ) : activeItem === "Search" ? (
        <Segment>
          <Form onSubmit={handleOnSubmit} style={{ justifyContent: "center" }}>
            <Form.Field style={{ width: "60%" }}>
              <Input
                icon="search"
                placeholder="Search News"
                onChange={handleSearchChange}
                value={searchTitle}
              />{" "}
            </Form.Field>
          </Form>
          <Cards handleClick={handleNewsClick} />
        </Segment>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Tabs;
