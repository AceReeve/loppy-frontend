"use client";
import { useGetRolesQuery } from "@repo/redux-utils/src/endpoints/settings-user.ts";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  Button,
  Separator,
  VerticalMenu,
  VerticalMenuLink,
} from "@repo/ui/components/ui";
import React, { useCallback, useEffect, useState } from "react";
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";

export default function RolesPermission() {
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      title: "Can access Messages",
      description: "Allow user to access Messages",
      isToggled: true,
    },
    {
      id: 2,
      title: "Can access Contacts",
      description: "Allow user to access contacts",
      isToggled: true,
    },
    {
      id: 3,
      title: "Can access Marketing",
      description: "Allow user to access marketing",
      isToggled: true,
    },
    {
      id: 4,
      title: "Can access Pipelines",
      description: "Allow user to access pipelines",
      isToggled: true,
    },
    {
      id: 5,
      title: "Can access Workflows",
      description: "Allow user to access workflows",
      isToggled: true,
    },
    {
      id: 6,
      title: "Can access Reporting",
      description: "Allow user to access reporting",
      isToggled: true,
    },
    {
      id: 7,
      title: "Can access Branding",
      description: "Allow user to access branding",
      isToggled: true,
    },
  ]);

  const handleToggleChange = (id: number) => {
    setPermissions((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isToggled: !setting.isToggled }
          : setting,
      ),
    );
  };

  const {
    data: rolesData,
    error: rolesError,
    isLoading: rolesIsLoading,
  } = useGetRolesQuery();

  const [selectedRole, setSelectedRole] = useState<string>("");

  // Initialize selectedRole if rolesData changes
  useEffect(() => {
    if (rolesData && rolesData.length > 0) {
      setSelectedRole(rolesData[1]._id);
    }
  }, [rolesData]);

  const handleChangeRole = useCallback((roleId: string) => {
    setSelectedRole(roleId);
  }, []);
  if (rolesIsLoading)
    return (
      <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
        <LoadingSpinner />
        <p>Loading, please wait...</p>
      </div>
    );

  if (rolesError) return <div>Error loading roles</div>;

  return (
    <div className="mt-4 flex gap-5 space-x-4 ">
      <div className="min-w-[200px] max-w-[300px]">
        <VerticalMenu className=" !shadow-none">
          {rolesData ? (
            rolesData.map(
              (role) =>
                role.role_name !== "Owner" && (
                  <VerticalMenuLink
                    active={role._id === selectedRole}
                    key={role._id}
                    className="cursor-pointer"
                    onClick={() => {
                      handleChangeRole(role._id);
                    }}
                  >
                    {role.role_name}
                  </VerticalMenuLink>
                ),
            )
          ) : (
            <div>No Data</div>
          )}
        </VerticalMenu>
      </div>
      <div className=" h-full min-h-[1000px] border-l border-gray-300" />
      <div className="w-full space-y-4 p-4">
        {/*        <div className=" flex flex-row items-center justify-between">
          <div className="relative flex w-full flex-row  ">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-2 top-1.5 h-5 w-5 text-gray-500 " />
            </div>

            <Input
              className="h-[35px] max-w-60 pl-10"
              placeholder="Search permissions"
              type="search"
            />
          </div>
        </div>*/}

        <div>
          <div className=" flex justify-between font-poppins">
            <p className="text-sm font-bold">PERMISSIONS</p>
            <p className="cursor-pointer text-sm font-semibold text-orange-500">
              Clear Permissions
            </p>
          </div>
          <Separator className="my-4" />
        </div>
        <div className="space-y-4">
          {permissions.map((permission) => (
            <ToggleData
              id={permission.id}
              title={permission.title}
              description={permission.description}
              isToggled={permission.isToggled}
              key={permission.id}
              onToggleChange={() => {
                handleToggleChange(permission.id);
              }}
            />
          ))}
        </div>
        <div className=" flex justify-end ">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
