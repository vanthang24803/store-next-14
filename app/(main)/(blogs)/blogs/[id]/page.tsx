/* eslint-disable @next/next/no-img-element */
import getDetailBlog from "@/actions/get-blog-detail";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Detail } from "../_components/detail";
import { decodeSlug } from "@/utils/slug";
import { uuidRegex } from "@/utils/regex";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const blog = await getDetailBlog(decodeSlug(params.id) || "");
  return {
    title: blog.title || "Blog",
  };
}

export default async function BlogDetail({ params }: Props) {
  const uuid = decodeSlug(params.id);
  const blog = await getDetailBlog(uuid || "");

  return (
    <div className="lg:container p-4 flex flex-col space-y-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blogs">Tất cả bài viết</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{blog.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Detail blog={blog} />
    </div>
  );
}
