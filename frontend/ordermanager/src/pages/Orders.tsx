import { useEffect, useState } from "react";
// import { data } from "react-router-dom";
import AvailOrders from "../components/AvailOrders";
import vindhuIMG from "../assets/vindhu_logo2.png";


export default function Orders() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  type OrderItemMap = {
    [key: string]: number;
  };

  type Order = {
    id: number;
    cancle_status: boolean;
    sum_total: number;
    description: string;
    orderId: number;
    orderdata: {
      additionalProp1: OrderItemMap;
    };
  };

  type Food = {
    // OrderId: number;
    // orderData: JSON;
    // cancle_status: boolean;
    // description: string;
    // total_bill: number;
    orderId: number;
    orderdata: Record<string, Record<string, number>>;
    cancle_status: boolean;
    description: string;
    sum_total: number;
  };

  useEffect(() => {
    fetch("http://192.168.1.79:8000/getallorders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("data fetch failed!");
        }
        return res.json();
      })
      .then((data: Food[]) => {
        setFoods(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  return (
    <>
      {/* <div className="space-y-4">
        {foods.map((food) => (
          <div key={food.orderId}>
            <h2>{food.orderId}</h2>
            <p>{food.description}</p>
          </div>
        ))}
      </div> */}
      {/* <AvailOrders orderid={
        foods.map((food)=>(
          food.orderId
        ))
      } image='' caption={foods.map((food)=>(food.description))} /> */}
      {/* {console.log(foods)} */}
      <div className="gap-3 flex flex-col items-center">
      {foods.map((food) => (
          <AvailOrders
          key={food.orderId}
          image={vindhuIMG}
          orderid={food.orderId}
          caption={(!food.description)?`description:N/A`:`description:\n${food.description}`}
          cancle_status={(!food.cancle_status)?"Active":"Cancelled"}
          item_list={food.orderdata.additionalProp1}
          total_amount={food.sum_total}
        />
        
      ))}
      </div>
    </>
  );
}
