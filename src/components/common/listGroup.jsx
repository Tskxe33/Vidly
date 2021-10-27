import React from "react";

const ListGroup = (props) => {
  const { items, onItemSelect, selectedItem, textProperty, valueProperty } =
    props;
  return (
    <ul className="list-group mt-5">
      {items.map((item) => (
        <li
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
          aria-current="true"
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          style={{ cursor: "pointer" }}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = { textProperty: "name", valueProperty: "_id" };

export default ListGroup;
