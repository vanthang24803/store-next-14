import FormUpdatePost from "./_componnets/form-update";

type Props = {
  params: {
    id: string;
  };
};

export default function PostUpdate({ params }: Props) {
  return <FormUpdatePost id={params.id} />;
}
