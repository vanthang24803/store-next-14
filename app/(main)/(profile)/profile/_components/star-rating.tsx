import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  rating: number | null;
  setRating: Dispatch<SetStateAction<number | null>>;
};

export const StarRating = ({ rating, setRating }: Props) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleRatingMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleRatingMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {[...Array(5)].map((_, index) => {
        const isActive = rating === null ? hoverRating && hoverRating >= index + 1 : rating >= index + 1;
        const color = isActive ? "text-yellow-300" : "text-neutral-200";

        return (
          <label
            key={index}
            onMouseEnter={() => handleRatingMouseEnter(index)}
            onMouseLeave={handleRatingMouseLeave}
          >
            <input
              type="radio"
              name="rating"
              className="hidden"
              value={index + 1}
              checked={rating === index + 1}
              onChange={() => setRating(index + 1)}
            />
            <svg
              className={`w-8 h-8 ms-3 ${color} hover:cursor-pointer`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};