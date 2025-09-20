import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  handleDeleteItem,
  handleToggleItem,
  setItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            handleToggleItem={handleToggleItem}
            handleDeleteItem={handleDeleteItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Packed status</option>
        </select>
        <button
          onClick={() => {
            if (items.length === 0) return;
            const confimed = window.confirm(
              "Are you sure you want to clear the list?"
            );
            if (confimed) setItems([]);
          }}
        >
          Clear List
        </button>
      </div>
    </div>
  );
}
