import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
// import SearchBar from "../components/Searchbar";
import SearchBar from "../components/Searchbar";
import CreateOrder from "../components/CreateOrder";
export default function Home() {


  const navigate = useNavigate();
  const OrderPageClick = () => {
    navigate('/OrderPage');
  }

  const showOrders = () =>{
    navigate('/Orders');
  }


  return (
    <>
      {/* <div className="space-y-3 flex flex-col">
        <SearchBar />
        <Card title="Menu" caption="available items list" buttonText="Take order" />
        <Card title="Orders" caption="shows available orders" buttonText="show"/>
        
      </div> */}
      <div className=" flex items-center justify-center px-4">
        <div className="flex flex-col space-y-4 w-full max-w-md">
          <SearchBar />
          <div className="items-center justify-center flex flex-col space-y-4">
            {/* <CreateOrder title="" caption="" buttonText=""/> */}
            <Card
              title="Menu"
              caption="available items list"
              buttonText="Take order"
              onButtonClick={OrderPageClick}
            />
            <Card
              title="Orders"
              caption="shows available orders"
              buttonText="Show"
              onButtonClick={showOrders}
            />
          </div>
        </div>
      </div>
    </>
  );
}
