export function Footer({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <em>Start adding some stuff 🏁</em>
      </footer>
    );
  }
  return (
    <footer className="stats">
      <em>
        {items.length !== items.filter((item) => item.packed).length
          ? `
        You currently have ${
          items.length
        } items in your list and you have packed ${" "}
        ${items.filter((item) => item.packed).length} items (
        ${Math.round(
          (items.filter((item) => item.packed).length / items.length) * 100
        )}
        %)
        `
          : "You are all packed up 💯"}
      </em>
    </footer>
  );
}
