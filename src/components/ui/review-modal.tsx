import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal, ModalFooter } from "../ui/modal";
import { Button } from "../ui/button";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  orderId: string;
}

export function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  orderId,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      alert("Please enter a comment");
      return;
    }
    onSubmit(rating, comment);
    // Reset form
    setRating(0);
    setComment("");
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setComment("");
    onClose();
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || rating);
      stars.push(
        <button
          key={i}
          type="button"
          className={`text-2xl transition-colors ${
            isFilled ? "text-yellow-400" : "text-gray-300"
          } hover:text-yellow-400`}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(i)}
        >
          <Icon icon="mdi:star" />
        </button>
      );
    }
    return stars;
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Review Order" size="md">
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">
            How would you rate your experience with order{" "}
            <span className="font-medium">{orderId}</span>?
          </p>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-1">
            {renderStars()}
            {rating > 0 && (
              <span className="ml-3 text-sm text-gray-600">
                {rating} out of 5 stars
              </span>
            )}
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience with this order..."
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent resize-none"
            rows={4}
          />
          <p className="text-xs text-gray-500 mt-1">
            {comment.length}/500 characters
          </p>
        </div>
      </div>

      <ModalFooter>
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={rating === 0 || !comment.trim()}
        >
          Submit Review
        </Button>
      </ModalFooter>
    </Modal>
  );
}
