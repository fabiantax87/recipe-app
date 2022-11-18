import GroceryListItem from "components/GroceryListItem/GroceryListItem";
import "./GroceryList.scss";

type GroceryListProps = {
  groceryList: Array<any>;
  setGroceryList: Function;
};

const GroceryList = ({ groceryList, setGroceryList }: GroceryListProps) => {
  return (
    <div className="grocery-list">
      {groceryList.map((grocery: any, index: number) => {
        return <GroceryListItem key={index} grocery={grocery} index={index} groceryList={groceryList} setGroceryList={setGroceryList} />;
      })}
    </div>
  );
};

export default GroceryList;
