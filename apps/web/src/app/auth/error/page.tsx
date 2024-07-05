enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  OAuthCallbackError = "OAuthCallbackError",
  Default = "Default",
}

const errorMap = {
  [Error.Configuration]: (
    <p>
      There was a problem when trying to authenticate. Please contact us if this
      error persists. Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Configuration</code>
    </p>
  ),
  [Error.AccessDenied]: (
    <p>
      Access Denied. Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">AccessDenied</code>
    </p>
  ),
  [Error.OAuthCallbackError]: (
    <p>
      An error occurred while trying to login with the authentication provider.
      Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">
        OAuthCallbackError
      </code>
    </p>
  ),
  [Error.Default]: (
    <p>
      An error occurred while trying to login with the authentication provider.
      Unique error code:{" "}
      <code className="text-xs bg-slate-100 p-1 rounded-sm">Default</code>
    </p>
  ),
};

// TODO: Utilize the error returned from searchparams
export default function AuthError({
  searchParams,
}: {
  searchParams?: { error: keyof typeof errorMap };
}) {
  const error = searchParams?.error ?? Error.Default;

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white flex flex-row justify-center items-center gap-2">
          Something went wrong
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error]}
        </div>
      </div>
    </div>
  );
}
