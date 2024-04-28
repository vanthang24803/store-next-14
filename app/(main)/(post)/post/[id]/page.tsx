import { decodeSlug } from "@/utils/slug";
import FormUpdatePost from "./_components/form-update";

type Props = {
  params: {
    id: string;
  };
};

export default function PostUpdate({ params }: Props) {
  return <FormUpdatePost id={decodeSlug(params.id) || ""} />;
}
