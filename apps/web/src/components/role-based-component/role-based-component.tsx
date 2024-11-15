import { useSession } from "next-auth/react";
import { type JSX } from "react";
import { type Role } from "@/next-auth";

interface RoleBasedComponentProps {
  allowedRoles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function withRole<P>(
  Component: React.ComponentType<P>,
  allowedRoles: RoleBasedComponentProps["allowedRoles"],
  fallback?: React.ReactNode,
) {
  function RoleBasedWrapper(props: P & JSX.IntrinsicAttributes) {
    return (
      <RoleBasedComponent allowedRoles={allowedRoles} fallback={fallback}>
        <Component {...props} />
      </RoleBasedComponent>
    );
  }

  // Set display name for debugging
  RoleBasedWrapper.displayName = `withRole(${(Component.displayName ?? Component.name) || "Component"})`;

  return RoleBasedWrapper;
}

function RoleBasedComponent({
  allowedRoles,
  children,
  fallback,
}: RoleBasedComponentProps) {
  const { data: session } = useSession();
  const role = session?.role;

  if (!role || !allowedRoles.includes(role as Role)) {
    return fallback ?? null; // Or redirect, or show a "Not Authorized" message
  }

  return <>{children}</>;
}

export { withRole, RoleBasedComponent };
