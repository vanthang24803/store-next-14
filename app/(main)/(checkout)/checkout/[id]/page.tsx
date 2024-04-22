"use client";

import { Order } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { OrderDetail } from "../_components/order-detail";
import _http from "@/utils/http";

interface OrderIdProp {
  params: {
    id: string;
  };
}

export default function OrderId({ params }: OrderIdProp) {
  const [order, setOrder] = useState<Order | null>(null);

  const [showConfetti, setShowConfetti] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(params.id);
    toast.success("Mã đơn hàng đã được copy!");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await _http.get(`/api/order/${params.id}`);

      if (response.status == 200) {
        setOrder(response.data);
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div className="md:w-[500px] w-[360px] py-4 px-6 bg-white/90 rounded-lg  flex flex-col space-y-1">
      {showConfetti && <Confetti />}
      <OrderDetail id={params.id} copy={onCopy} order={order} />
    </div>
  );
}
