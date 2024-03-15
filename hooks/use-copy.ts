import { Attribute } from "@/types";
import toast from "react-hot-toast";

export default function useCopy({
  attribute,
}: {
  attribute: Attribute;
}) {
  const onCopy = (id: string) => {
    const attributeCapitalized =
      attribute.charAt(0).toUpperCase() + attribute.slice(1);
    navigator.clipboard.writeText(id);
    toast.success(`${attributeCapitalized} ID copied to clipboard.`);
  };

  return {
    onCopy,
  };
}
