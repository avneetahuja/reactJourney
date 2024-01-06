import { useState } from "react";
import { Header } from "./Header";
import { AddItems } from "./AddItems";
import { List } from "./List";
import { Footer } from "./Footer";

var initialItems = [
  { description: "Passport", quantity: 1, packed: false, id: 1704381715841 },
  { description: "Loofahs", quantity: 3, packed: false, id: 1704381768216 },
  { description: "Perfumes", quantity: 2, packed: false, id: 1704381787994 },
  { description: "I-20", quantity: 1, packed: false, id: 1704381823315 },
  { description: "iPad Pen", quantity: 1, packed: false, id: 1704382949769 },
  { description: "Cash", quantity: 1, packed: false, id: 1704382964201 },
  { description: "Wallet", quantity: 1, packed: false, id: 1704382971733 },
  { description: "Controller", quantity: 1, packed: false, id: 1704383050900 },
  { description: "Serum", quantity: 1, packed: false, id: 1704386874978 },
  { description: "Toner pads", quantity: 4, packed: false, id: 1704386886570 },
  {
    description: "Day/Night Cream",
    quantity: 1,
    packed: false,
    id: 1704386907536,
  },
  { description: "Shoes", quantity: 3, packed: false, id: 1704386972416 },
  { description: "Belts", quantity: 2, packed: false, id: 1704387006937 },
  { description: "Eyeglasses", quantity: 4, packed: false, id: 1704387153158 },
  { description: "Brush", quantity: 2, packed: false, id: 1704391429993 },
  { description: "Transcripts", quantity: 1, packed: false, id: 1704391548217 },
  {
    description: "MagSafe Charger",
    quantity: 1,
    packed: false,
    id: 1704391585517,
  },
  {
    description: "Rayban Sunglasses",
    quantity: 1,
    packed: false,
    id: 1704391671372,
  },
  {
    description: "Torex w/ Prescription",
    quantity: 1,
    packed: false,
    id: 1704391752429,
  },
  { description: "Ghee", quantity: 1, packed: false, id: 1704391759574 },
  {
    description: "Desert Safari Pic",
    quantity: 1,
    packed: false,
    id: 1704391781132,
  },
  { description: "Dolo", quantity: 1, packed: false, id: 1704391816192 },
  { description: "Thaathe", quantity: 10, packed: false, id: 1704392043516 },
  { description: "Sallai", quantity: 5, packed: false, id: 1704392063038 },
  { description: "Eyedrops", quantity: 1, packed: false, id: 1704392106227 },
  {
    description: "Orange Backpack",
    quantity: 1,
    packed: false,
    id: 1704391781133,
  },
];

export default function App() {
  const [items, setItems] = useState(initialItems);

  function add(item) {
    console.log(initialItems.filter((item) => (item.packed ? item : {})));
    setItems((items) => [...items, item]);
  }

  function del(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function togglePack(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function clearItems() {
    const answer = window.confirm("Do you really want to clear the list?");
    if (answer) setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <AddItems onAddItem={add} />
      <List
        items={items}
        onDeleteItem={del}
        onUpdateItem={togglePack}
        onClear={clearItems}
      />
      <Footer items={items} />
    </div>
  );
}
