interface Props {
  pricesAndItems: { item: string; price: number }[];
}

function Prices({ pricesAndItems }: Props) {
  // console.log(pricesAndItems);
  return (
    <>
      {pricesAndItems.length === 0 && <p>No Items Yet</p>}
      <ul className="list-group">
        {pricesAndItems.map((x) => (
          <li key={x.item}>{"• " + x.item + " " + x.price}</li>
        ))}
      </ul>
    </>
  );
}

export default Prices;
