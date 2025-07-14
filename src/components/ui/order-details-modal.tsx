import { Modal } from "../ui/modal";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { Order } from "@/lib/types";

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  getProductName: (productId: string) => string;
}

export function OrderDetailsModal({
  isOpen,
  onClose,
  order,
  getProductName,
}: OrderDetailsModalProps) {
  if (!order) return null;

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "mdi:check-circle";
      case "shipped":
        return "mdi:truck";
      case "processing":
        return "mdi:cog";
      case "pending":
        return "mdi:clock";
      case "cancelled":
        return "mdi:close-circle";
      default:
        return "mdi:help-circle";
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Details" size="lg">
      <div className="space-y-6">
        <div className="border-[0.5px] border-gold p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium uppercase tracking-wider text-gold">
                Order ID
              </label>
              <p className="text-lg truncate">{order.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium uppercase tracking-wider text-gold">
                Order Date
              </label>
              <p className="text-lg">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium uppercase tracking-wider text-gold">
                Total Amount
              </label>
              <p className="text-lg font-semibold text-green-600">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium uppercase tracking-wider text-gold">
                Status
              </label>
              <div className="flex items-center space-x-2">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  <Icon icon={getStatusIcon(order.status)} className="mr-2" />
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-3 flex items-center font-garamond">
            Order Items&nbsp;
            <span className="text-gold"> ({order.items.length})</span>
          </h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white border-[0.5px] border-gold rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {getProductName(item.productId)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium uppercase text-gold">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.review && (
          <div>
            <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center font-garamond">
              Your Review
            </h3>
            <div className="bg-yellow-50 p-4 rounded-lg border-[0.5px] border-yellow-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      icon="mdi:star"
                      className={`text-lg ${
                        i < order.review!.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {order.review.rating} out of 5 stars
                </span>
              </div>
              <p className="text-gray-700 italic">"{order.review.comment}"</p>
              <p className="text-xs text-gray-500 mt-2">
                Reviewed on{" "}
                {new Date(order.review.reviewDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-xl font-medium text-gray-900 mb-3 flex items-center font-garamond">
            Order Timeline
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">
                Order placed - {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </div>
            {order.status !== "pending" && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">
                  Status updated to: {order.status}
                </span>
              </div>
            )}
            {order.review && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">
                  Order reviewed -{" "}
                  {new Date(order.review.reviewDate).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
