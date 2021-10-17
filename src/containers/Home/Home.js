import React from "react";
import classes from "./Home.module.css";
import Todo from "../../components/Todo/Todo";

const Home = () => {
  return (
    <div className={classes.Home}>
      <Todo />
    </div>
  );
};

export default Home;
