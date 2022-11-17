import GroceryListItem from "components/GroceryListItem/GroceryListItem";
import "./GroceryList.scss";

type GroceryListProps = {
  groceryList: Array<any>;
};

const GroceryList = ({ groceryList }: GroceryListProps) => {
  return (
    <div className="grocery-list">
      {groceryList.map((grocery: any, index: number) => {
        return <GroceryListItem key={index} grocery={grocery} index={index} />;
      })}
    </div>
  );
};

export default GroceryList;
