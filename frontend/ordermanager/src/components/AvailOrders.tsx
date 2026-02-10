// import { useState } from "react"

type ItemList = {
  [itemName: string]: number;
};

type FoodCardProps = {
  image: string;
  // title: string;
  orderid: number;
  caption: string;
  item_list: ItemList;
  cancle_status: string;
  total_amount: number;
};

export default function AvailOrders({
  image,
  orderid,
  caption,
  cancle_status,
  item_list,
  total_amount,
}: FoodCardProps) {
  //   const [qty, setQty] = useState(0)

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md border overflow-hidden">
      <div className="flex gap-4 p-4">
        {/* Image */}
        <img
          src={image}
          // alt={title}
          className="w-24 h-24 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{orderid}</h3>
          </div>
          <div>
            <p>
              {Object.entries(item_list).map(([item, price]) => (
                <li key={item} className="flex justify-between text-sm">
                  <span>{item}</span>
                  <span>₹{price}</span>
                </li>
              ))}
              <p className="text-sm text-gray-500 mt-1">{caption}</p>
            </p>
          </div>
          {/* Quantity controls */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex justify-center items-center gap-3">
              <span className="text-sm text-gray-600">
                order status: {cancle_status}
              </span>
              <span>total: {total_amount}</span>
            </div>

            {/* <div className="flex items-center gap-3">
              <button
                onClick={() => setQty(Math.max(0, qty - 1))}
                className="w-8 h-8 flex items-center justify-center
                           rounded-full border text-lg font-medium
                           hover:bg-gray-100"
              >
                −
              </button>

              <span className="w-6 text-center font-medium">
                {qty}
              </span>

              <button
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 flex items-center justify-center
                           rounded-full bg-indigo-600 text-white
                           hover:bg-indigo-700"
              >
                +
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
