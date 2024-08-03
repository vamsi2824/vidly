import React, { Component } from "react";

const ListGroup = (props) => {
  const { items, valuesProperty, textProperty, onItemSelect, selectedGenres } =
    props;

  return (
    <ul className="list-group">
      {items.map((m) => (
        <li
          onClick={() => onItemSelect(m)}
          className={
            m === selectedGenres ? "list-group-item active" : "list-group-item"
          }
          key={m[valuesProperty]}
        >
          {m[textProperty]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  textProperty: "name",
  valuesProperty: "_id",
};
export default ListGroup;
