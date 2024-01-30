interface Props {
  items: string[];
  removeItem: (item: string) => void;
}

function ListGroup({ items, removeItem }: Props) {
  return (
    <>
      {items.length === 0 && <p>No Item Found</p>}
      <ul className="list-group">
        {items.map((item) => (
          <li key={item}>
            {"• " + item}
            <button onClick={() => removeItem(item)} className="remove-buttons">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
