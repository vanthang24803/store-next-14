import { Separator } from "@/components/ui/separator";
import { BlogContent } from "./_components/content";

export default function Blogs() {
  return (
    <div className="flex flex-col space-y-8">
      <div className="flex items-center justify-center flex-col  space-y-4 ">
        <h1 className="text-2xl  font-bold">Bài viết của bạn</h1>
        <Separator className="w-[100px] h-1 bg-black rounded" />
      </div>

      <div className="flex flex-col space-y-4 w-full bg-white p-4 rounded-md">
        <h2 className="uppercase font-semibold">Danh sách bài viết</h2>

        <BlogContent />
      </div>
    </div>
  );
}
