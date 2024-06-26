import NotFound from "@/src/app/not-found";

// TODO: Utilize params
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars -- will implement soon
export default function Page({ params }: { params: { slug: string } }) {
  return <NotFound />;
}
