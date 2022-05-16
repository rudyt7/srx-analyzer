import React, { useState, Fragment } from "react";
import { FormLabel, Switch } from "@chakra-ui/react";

import "./Filter.css";

const Filter = (props) => {
  const filterChangeHandler = () => {
    props.changeHandler(!props.value);
  };

  return (
    <div className="switch">
      <FormLabel htmlFor={props.id}>{props.caption}</FormLabel>
      <Switch
        colorScheme="purple"
        id={props.id}
        onChange={filterChangeHandler}
      />
    </div>
  );
};

export default Filter;
