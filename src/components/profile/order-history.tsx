import { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLocation } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { orderService, devUtils } from "@/services/localStorage/cart";
import { getProductsById } from "@/services/localStorage/products";
import type { Order, Product } from "@/lib/types";
import useAuthContext from "@/hooks/useAuthContext";
import { ReviewModal } from "../ui/review-modal";
import { OrderDetailsModal } from "../ui/order-details-modal";

export default function OrderHistory() {
  const { currentUser } = useAuthContext();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdminMode, setShowAdminMode] = useState(false);

  // Modal states
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrdersAndProducts = async () => {
      if (!currentUser) return;

      try {
        const userOrders = await orderService.getUserOrders(currentUser);
        setOrders(userOrders);

        // Get all unique product IDs from all orders
        const productIds = Array.from(
          new Set(
            userOrders.flatMap((order) =>
              order.items.map((item) => item.productId)
            )
          )
        );

        if (productIds.length > 0) {
          const allProducts = await getProductsById(productIds);
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndProducts();
  }, [currentUser]);

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green/10 text-green";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProductName = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  const handleReviewOrder = async (orderId: string) => {
    setSelectedOrderId(orderId);
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!currentUser || !selectedOrderId) return;

    try {
      await orderService.reviewOrder(
        currentUser,
        selectedOrderId,
        rating,
        comment
      );
      // Refresh orders
      const userOrders = await orderService.getUserOrders(currentUser);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error reviewing order:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setDetailsModalOpen(true);
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: Order["status"]
  ) => {
    if (!currentUser) return;

    try {
      await orderService.updateOrderStatus(currentUser, orderId, newStatus);
      // Refresh orders after status change
      const userOrders = await orderService.getUserOrders(currentUser);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status. Please try again.");
    }
  };

  const handleAutoProgress = async (orderId: string) => {
    if (!currentUser) return;

    try {
      await devUtils.simulateOrderProgression(currentUser, orderId);
      // Refresh orders after progression
      const userOrders = await orderService.getUserOrders(currentUser);
      setOrders(userOrders);
    } catch (error) {
      console.error("Error progressing order:", error);
      alert("Failed to progress order. Please try again.");
    }
  };

  const clearAllOrders = async () => {
    if (!currentUser) return;

    const confirmed = confirm(
      "Are you sure you want to clear all orders? This action cannot be undone."
    );
    if (confirmed) {
      try {
        await devUtils.clearUserOrders(currentUser);
        setOrders([]);
      } catch (error) {
        console.error("Error clearing orders:", error);
        alert("Failed to clear orders. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center text-gray-800">
            <Icon icon="mdi:history" className="mr-2 text-accent" />
            Order History
          </h3>

          <div className="flex items-center space-x-4">
            <div className="w-72">
              <Input
                placeholder="Search by order or tracking #"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9"
                prefix={<Icon icon="mdi:magnify" className="text-gray-400" />}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() => setShowAdminMode((prev) => !prev)}
            >
              <Icon
                icon={showAdminMode ? "mdi:shield-off" : "mdi:shield-check"}
                className="text-gray-500"
              />
              <span className="text-gray-700">
                {showAdminMode ? "Disable" : "Enable"} Admin Mode
              </span>
            </Button>
          </div>
        </div>

        {/* Order Management Controls */}
        {showAdminMode && (
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center">
                <Icon icon="mdi:tools" className="mr-2" />
                Order Management Tools
              </h3>
              <div className="space-y-2">
                <p className="text-xs text-blue-700">
                  Use these tools to manage order statuses and test the order
                  system:
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearAllOrders}
                  >
                    <Icon icon="mdi:delete" className="mr-1" />
                    Clear All Orders
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="p-5">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-medium">Order ID</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                    <TableHead className="font-medium">Items</TableHead>
                    <TableHead className="font-medium">Total</TableHead>
                    <TableHead className="font-medium">Status</TableHead>
                    <TableHead className="font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.orderDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-accent/10 hover:text-accent"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Icon icon="mdi:eye" className="mr-1" /> View
                        </Button>
                        {order.status === "delivered" && !order.review && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => handleReviewOrder(order.id)}
                          >
                            <Icon icon="mdi:star" className="mr-1" /> Review
                          </Button>
                        )}
                        {order.review && (
                          <span className="text-xs text-green-600 font-medium">
                            ✓ Reviewed
                          </span>
                        )}
                        {showAdminMode && (
                          <div className="flex space-x-2 mt-2">
                            <Select
                              value={order.status}
                              onValueChange={(newStatus: Order["status"]) =>
                                handleStatusChange(order.id, newStatus)
                              }
                            >
                              <SelectTrigger className="w-32 h-8">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">
                                  Processing
                                </SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAutoProgress(order.id)}
                              className="text-blue-600 hover:bg-blue-50"
                            >
                              <Icon icon="mdi:arrow-right" className="mr-1" />
                              Progress
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon
                icon="mdi:shopping-outline"
                className="mx-auto text-4xl text-gray-400 mb-2"
              />
              <h3 className="text-lg font-medium text-gray-500">
                {searchTerm ? "No matching orders found" : "No orders yet"}
              </h3>
              <p className="text-sm text-gray-400">
                {searchTerm
                  ? "Try a different search term"
                  : "Your order history will appear here"}
              </p>
              {!searchTerm && (
                <Button
                  className="mt-4 bg-accent hover:bg-accent/80 text-white"
                  onClick={() => setLocation("/home")}
                >
                  Browse Products
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
        orderId={selectedOrderId}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        order={selectedOrder}
        getProductName={getProductName}
      />
    </div>
  );
}
