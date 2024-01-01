import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import { ReactDOM } from "react";

const items = [
  {
    id: 1,
    name: "Folder",
    price: 1199,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/09/CF-1367-All-1.jpg",
    soldOut: false,
  },
  {
    id: 2,
    name: "Notebook",
    price: 80,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/08/IMG-6034-removebg-preview.png",
    soldOut: false,
  },
  {
    id: 3,
    name: "Diary",
    price: 590,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/08/IMG-6078-scaled.jpg",
    soldOut: false,
  },
  {
    id: 4,
    name: "Art Sketch Book",
    price: 460,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/08/71C2hH3l-ZL._SL1500_-300x300.jpg",
    soldOut: false,
  },
  {
    id: 5,
    name: "Round Sketchbook",
    price: 699,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/08/300-GSM-Girl-with-butterfly.png",
    soldOut: false,
  },
  {
    id: 6,
    name: "Executive Diary",
    price: 999,
    image:
      "https://godsgraceproducts.in/wp-content/uploads/2023/09/IMG-4459-300x300.jpg",
    soldOut: true,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Catalog />
      <Footer />
    </div>
  );
}

function Item(props) {
  return (
    <li className={`item ${props.item.soldOut ? "soldOut" : null}`}>
      <img src={props.item.image} alt={props.item.name}></img>{" "}
      <div>
        <h3>{props.item.name}</h3>
        <span>{props.item.soldOut? <strong>SOLD OUT</strong> : props.item.price + ".00"}</span>
      </div>
    </li>
  );
}

function Header() {
  return (
    <header className="header">
      <h1>God's Grace Distributions</h1>
    </header>
  );
}
function Catalog() {
  return (
    <div className="catalog">
      <h2>Our Catalog</h2>
      {items.length > 0 ? (
        <>
          <p>Selling stationary since 2002</p>
          <ul className="items">
            {items.map((item) => (
              <Item item={item} key={item.id} />
            ))}
            {/* Genius Code Above ^ */}
          </ul>
        </>
      ) : (
        <p>Allow it man we're still working on our menu n'that!</p>
      )}
    </div>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 18;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <div className="order">
          <p>
            We're open until {closeHour % 12}:00 PM. Come visit us or order
            online!
          </p>
          <button className="btn">Order</button>
        </div>
      ) : (
        <div className="order">
          We're happy to welcome you between {openHour}:00 and {closeHour}:00
        </div>
      )}
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
