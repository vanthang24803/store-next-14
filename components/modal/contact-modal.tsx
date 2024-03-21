import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";

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
          <DialogContent className="md:h-[500px] h-[250px]">
            <Image
              src="https://theme.hstatic.net/200000294254/1001077164/14/homebanner_1_img.jpg?v=372"
              className="hover:cursor-pointer object-fill"
              fill
              alt="modal"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}