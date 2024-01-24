import { useState } from "react";

interface Props {
  receiveItem: (item: string) => void;
}

const AddItem = ({ receiveItem }: Props) => {
  const [val, setVal] = useState("");
  const handleClick = () => {
    receiveItem(val);
    setVal("");
  };
  const handleChange = (event: any) => {
    setVal(event.target.value);
  };
  return (
    <div className="add-button">
      <input
        type="text"
        placeholder="Enter Item"
        onChange={handleChange}
        value={val}
      />
      <button type="button" onClick={handleClick}>
        Add Item
      </button>
    </div>
  );
};

export default AddItem;
