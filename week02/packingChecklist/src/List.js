import { useState } from "react";
import { Item } from "./Item";

export function List({ items, onDeleteItem, onUpdateItem, onClear }) {
  const [sortBy, setSortBy] = useState("time");
  let sortedItems;
  if (sortBy === "time") {
    sortedItems = items;
  } else if (sortBy === "name") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="time">Sort by added order</option>
          <option value="name">Sort by name</option>
          <option value="packed">Sort by status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}
