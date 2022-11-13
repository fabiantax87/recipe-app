import "./GroceryListItem.scss";

type GroceryListItemProps = {
  grocery: any;
  index: number;
};

const GroceryListItem = ({ grocery, index }: GroceryListItemProps) => {
  return (
    <div className="grocery-list-item">
      <span>{index + 1}.</span>
      <p>{grocery}</p>
    </div>
  );
};

export default GroceryListItem;
