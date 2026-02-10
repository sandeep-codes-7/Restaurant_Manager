type CardProps = {
  title: string
  caption: string
  buttonText: string
  onButtonClick?: () => void;
}

export default function Card({
  title,
  caption,
  buttonText,
  onButtonClick,
}: CardProps) {
  return (
    <div className="max-w-2xl w-full rounded-lg border border-gray-200 bg-white shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 ">
        {title}
      </h2>

      <p className="text-gray-600 text-sm mb-4">
        {caption}
      </p>

      <button
        onClick={onButtonClick}
        className="inline-flex items-center px-4 py-2 text-sm font-medium
                   text-white bg-indigo-600 rounded-md
                   hover:bg-indigo-700 focus:outline-none"
      >
        {buttonText}
      </button>
    </div>
  )
}
