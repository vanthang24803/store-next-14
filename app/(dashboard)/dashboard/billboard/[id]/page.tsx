interface BillboardProp {
  params: {
    id: string;
  };
}

export default function BillboardId({ params }: BillboardProp) {
  return <>Billboard is {params.id}</>;
}
