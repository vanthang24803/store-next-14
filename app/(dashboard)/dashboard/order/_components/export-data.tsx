"use client";

import axios from "axios";
import FileSaver from "file-saver";
import { Sheet } from "lucide-react";
import toast from "react-hot-toast";

export const ExportData = () => {
  const downloadFile = async () => {
    const response = await axios.get("http://localhost:7002/api/order/export", {
      responseType: "blob",
    });

    FileSaver.saveAs(new Blob([response.data]), "Order.xlsx");
    toast.success("File downloaded");
  };

  return (
    <div
      className="flex justify-end items-center hover:cursor-pointer"
      onClick={downloadFile}
    >
      <Sheet />
    </div>
  );
};
