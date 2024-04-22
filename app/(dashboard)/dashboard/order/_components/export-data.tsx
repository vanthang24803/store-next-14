"use client";

import _http from "@/utils/http";
import FileSaver from "file-saver";
import { Sheet } from "lucide-react";
import toast from "react-hot-toast";

interface ExportDataProps {
  url: string;
  fileName: string;
}

export const ExportData = ({ url, fileName }: ExportDataProps) => {
  const downloadFile = async () => {
    const response = await _http.get(`${url}`, {
      responseType: "blob",
    });

    FileSaver.saveAs(new Blob([response.data]), `${fileName}`);
    toast.success("File downloaded");
  };

  return (
    <div className="flex items-center justify-between pb-4">
      <p className="text-sm text-muted-foreground">Export Excel</p>
      <div
        className="flex justify-end items-center hover:cursor-pointer"
        onClick={downloadFile}
      >
        <Sheet />
      </div>
    </div>
  );
};
