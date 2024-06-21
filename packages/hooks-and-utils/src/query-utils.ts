import { type ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  setParams: Record<string, string>,
) => {
  const params = new URLSearchParams(searchParams.toString());
  Object.entries(setParams).forEach(([name, value]) => {
    params.set(name, value);
  });

  return params;
};
