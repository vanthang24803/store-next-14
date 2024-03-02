"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Profile } from "@/types";
import { useRef, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/use-auth";
import toast from "react-hot-toast";

interface AvatarUploadProps {
  fetchData: () => void;
  profile: Profile | undefined;
  id: string | undefined;
}

export const AvatarUpload = ({ fetchData, profile, id }: AvatarUploadProps) => {
  const auth = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState(auth.user?.avatar);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
    }
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (fileInputRef.current?.files?.length) {
      formData.append("id", id || "");
      formData.append("file", fileInputRef.current.files[0]);
    }

    setLoading(true);
    toast.loading("Waiting...");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${id}/avatar`,
        formData,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      )
      .then((response) => {
        if (response.status == 200) {
          fetchData();
          setOpen(false);
          toast.dismiss();
          toast.success("Avatar updated");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss();
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Avatar className="w-24 h-24 hover:cursor-pointer">
          <AvatarImage src={profile?.avatar} />
          <AvatarFallback>{profile?.lastName[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit avatar</DialogTitle>
          <DialogDescription className="text-xs">
            Make changes to your avatar profile here. Click save when you`re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 items-center justify-center">
          <Avatar className="w-36 h-36" onClick={handleAvatarClick}>
            <AvatarImage src={avatar} />
            <AvatarFallback>
              {profile?.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={loading || profile?.avatar    == avatar}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
