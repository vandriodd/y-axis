import { useState } from "react";
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

export interface Order {
  id: string;
  date: string;
  status: "Delivered" | "Processing" | "Cancelled";
  total: number;
  items: number;
  trackingNumber: string;
}

interface OrderHistoryProps {
  orders: Order[];
}

export default function OrderHistory({ orders }: OrderHistoryProps) {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green/10 text-green";
      case "Processing":
        return "bg-blue-100 text-blue-600";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center text-gray-800">
            <Icon icon="mdi:history" className="mr-2 text-accent" />
            Order History
          </h3>

          <div className="w-72">
            <Input
              placeholder="Search by order or tracking #"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
              prefix={<Icon icon="mdi:magnify" className="text-gray-400" />}
            />
          </div>
        </div>

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
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-accent/10 hover:text-accent"
                        >
                          <Icon icon="mdi:eye" className="mr-1" /> View
                        </Button>
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
    </div>
  );
}
