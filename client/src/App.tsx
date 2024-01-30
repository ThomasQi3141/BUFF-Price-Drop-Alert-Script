import { useState } from "react";
import AddItem from "./components/AddItem";
import ListGroup from "./components/ListGroup";
import Prices from "./components/Prices";

function App() {
  //Tracking List
  const [items, setItems] = useState<string[]>([]);
  //Items and Prices
  const [pricesAndItems, setPricesAndItems] = useState<
    { item: string; price: number }[]
  >([]);

  const receiveItem = (item: string) => {
    if (item.trim() === "") {
      alert("Cannot enter empty item");
    } else if (items.includes(item)) {
      alert("Item already exists!");
    } else {
      setItems([...items, item]);
    }
  };

  //Removes items
  const removeItem = (item: string) => {
    setItems(items.filter((x) => x != item));
  };

  //Send and receive data to/from the backend
  const fetchJSON = async () => {
    if (items.length === 0) {
      alert("No items selected");
    } else {
      const response = await fetch("http://localhost:8000/api", {
        method: "POST",
        body: JSON.stringify({
          items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      let newMap: { item: string; price: number }[] = [];
      for (let i = 0; i < data.Items.length; i++) {
        newMap.push({
          item: data.Items[i] as string,
          price: data.Prices[i] as number,
        });
      }
      setPricesAndItems(newMap);
    }
  };

  const sendEmail = async () => {
    const response = await fetch("http://localhost:8000/email", {
      method: "POST",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>BUFF Price Tracker</h1>
      <AddItem receiveItem={receiveItem} />
      <h2>Tracking List</h2>
      <button onClick={() => setItems([])} className="buttons">
        Remove All
      </button>
      <ListGroup items={items} removeItem={removeItem} />
      <h2>Prices</h2>
      <button
        onClick={() => {
          fetchJSON();
        }}
        className="buttons"
      >
        Get Prices
      </button>
      <button
        className="buttons"
        onClick={() => {
          sendEmail();
        }}
      >
        Email Me
      </button>
      <Prices pricesAndItems={pricesAndItems} />
    </div>
  );
}

export default App;
