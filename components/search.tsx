/* eslint-disable @next/next/no-img-element */
"use client";

// import axios from "axios";
// import qs from "query-string";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/types";
// import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchPage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const ref = useRef<HTMLDivElement | null>(null);

  const search = searchParams.get("anime");

  const [content, setContent] = useState(search || "");

  const [anime, setAnime] = useState<Product[]>([]);

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (open && ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await axios.get(`/api/anime/search?anime=${content}`);
  //         setAnime(response.data);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     fetchProducts();
  //   }, [content]);

  //   useEffect(() => {
  //     const query = {
  //       anime: content,
  //     };

  //     const url = qs.stringifyUrl(
  //       {
  //         url: window.location.href,
  //         query,
  //       },
  //       { skipNull: true, skipEmptyString: true }
  //     );

  //     router.push(url);
  //   }, [router, content]);

  return (
    <div className="relative md:block hidden dark:border-white group" ref={ref}>
      <Input
        className="lg:w-[500px] md:w-[300px] h-10 font-medium"
        onClick={() => setOpen(true)}
        onChange={handleInputChange}
        placeholder="Tìm kiếm sản phẩm..."
      />
      <div className="absolute top-1 right-1 w-14 h-5/6 flex items-center justify-center bg-[#417505] rounded-md cursor-pointer hover:bg-[#65b10d]">
        <Search className="w-4 h-4 text-white hover:cursor-pointer " />
      </div>
      {open && (
        <div className="lg:w-[500px] md:w-[300px] lg:min-h-[20vh] min-h-[15vh]  rounded-md bg-white dark:bg-neutral-700/90  p-4 md:absolute md:top-12 md:-right-2">
          <p className="text-sm font-medium">Gợi ý cho bạn:</p>
          {/* {content != "" ? (
            <ScrollArea className="w-full  max-h-[50vh] h-full">
              <div className="flex flex-col space-y-2">
                {anime.map((item, index) => (
                  <div
                    className="flex space-x-3 hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      router.push(`/anime/${item.id}`);
                      setOpen(false);
                    }}
                  >
                    <img
                      src={item.thumbnail}
                      alt="thubnail"
                      className="w-[100px] h-14 object-cover"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-[14px] hover:text-red-400 hover:font-medium">
                        {item.name}
                      </h3>
                      <span className="text-[12px] font-thin">
                        {item.views} lượt xem
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-[20vh]">
              <span>Nhập anime để tìm kiếm </span>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};
