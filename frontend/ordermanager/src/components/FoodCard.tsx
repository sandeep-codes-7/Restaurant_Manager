import { useState } from "react"

type FoodCardProps = {
  image: string
  title: string
  caption: string
}

export default function FoodCard({ image, title, caption }: FoodCardProps) {
  const [qty, setQty] = useState(0)

  return (
    <div className="w-full max-w-xl bg-white rounded-xl shadow-md border overflow-hidden">
      <div className="flex gap-4 p-4">

        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {caption}
            </p>
          </div>

          {/* Quantity controls */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm text-gray-600">
              Quantity
            </span>

            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
