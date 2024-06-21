// TODO: Utilize the error returned from searchparams
export default function AuthError({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const errors = {
    OAuthCallbackError: "Error",
  };

  return (
    <div>
      <h2>Something went wrong!</h2>
    </div>
  );
}
