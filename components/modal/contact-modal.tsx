import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogContent className="h-[420px] overflow-hidden">
            <Image
              src="https://theme.hstatic.net/200000294254/1001077164/14/homebanner_2_img.jpg?v=372"
              className="hover:cursor-pointer object-cover rounded-md"
              fill
              alt="modal"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
