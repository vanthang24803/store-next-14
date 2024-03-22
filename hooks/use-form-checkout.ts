import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useCart from "./use-cart";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  address: z.string().min(1),
  numberPhone: z.string().min(1).max(10),
});

type Props = {
  email: string | undefined;
  name: string | undefined;
  storeChecked: boolean;
  address: string | null;
  exitAddress: string | null;
  payment: string | null;
  sendChecked: boolean;
  voucher: string;
  userId: string | undefined;
  totalPrice: number;
};

type CreateFormValue = z.infer<typeof formSchema>;

export default function useFormCheckOut({
  email,
  name,
  storeChecked,
  address,
  exitAddress,
  payment,
  sendChecked,
  userId,
  voucher,
  totalPrice,
}: Props) {
  const cart = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const priceShip = cart.totalPrice() + 35000;

  const uuid = uuidv4();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      address: "",
      name: "",
      numberPhone: "",
    },
  });

  useEffect(() => {
    form.setValue("email", email || "");
    form.setValue("name", name || "");
    form.setValue("address", (storeChecked ? address : exitAddress) || "");
  }, [address, email, exitAddress, form, name, storeChecked]);

  const onSubmit = async (data: CreateFormValue) => {
    const dataSend = {
      ...data,
      id: uuid,
      products: cart.items.map((item) => ({
        optionId: item.product.options[0].id,
        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        option: item.product.options[0].name,
        price: item.product.options[0].price,
        sale: item.product.options[0].sale,
        quantity: item.quantity,
      })),
      voucher: voucher,
      payment: payment?.toUpperCase(),
      shipping: sendChecked,
      quantity: cart.items.length,
      totalPrice: totalPrice,
      userId: userId || "",
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/create`,
        dataSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        toast.success("Thành công");
        router.push(`/checkout/${uuid}`);
        cart.removeAll();
      } else {
        toast.error("Thất bại");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { form, onSubmit, loading, priceShip };
}
