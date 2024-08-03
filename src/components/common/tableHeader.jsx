import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.OnSort(sortColumn);
  };
  renderSortIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickble"
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label}
              {this.renderSortIcon(column)}
            </th>
          ))}
          <th></th>
          <th></th>
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
