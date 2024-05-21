import NotFound from "@/src/app/not-found";

export default function Page({ params }: { params: { slug: string } }) {
  return <NotFound />;
}
