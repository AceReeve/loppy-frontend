"use client";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  toast,
} from "@repo/ui/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import {
  useChangePasswordMutation,
  useCreatePasswordMutation,
  useGetUserProfileQuery,
} from "@repo/redux-utils/src/endpoints/user";
// import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";
import {
  changePasswordSchema,
  securitySchema,
} from "../schemas/personal-settings-schemas";

export default function SecurityTab() {
  /* const [showConfirmPassword, setConfirmShowPassword] = useState(false);*/

  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    refetch,
  } = useGetUserProfileQuery(undefined);

  // password types
  interface PasswordField {
    id: number;
    field: "current_password" | "new_password" | "confirm_new_password";
    label: string;
    placeHolder: string;
    isShown: boolean;
  }

  interface CreatePasswordField {
    id: number;
    field: "password" | "confirm_password";
    label: string;
    placeHolder: string;
    isShown: boolean;
  }

  // Use the type in your useState call
  const [passwordInputs, setPasswordInputs] = useState<PasswordField[]>([
    {
      id: 1,
      field: "current_password",
      label: "Current Password",
      placeHolder: "",
      isShown: false,
    },
    {
      id: 2,
      field: "new_password",
      label: "New Password",
      placeHolder: "",
      isShown: false,
    },
    {
      id: 3,
      field: "confirm_new_password",
      label: "Confirm New Password",
      placeHolder: "",
      isShown: false,
    },
  ]);

  // change password
  const securityForm = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  const [sendRequest, { isLoading }] = useChangePasswordMutation();
  const onSubmit = async (data: z.infer<typeof securitySchema>) => {
    // remove the confirm_new_password
    // eslint-disable-next-line -- remove confirm_new_password from data
    const { confirm_new_password, ...newData } = data;

    await sendRequest(newData)
      .unwrap()
      .then(() => {
        toast({
          description: "Password changed successfully",
        });

        void refetch();
        securityForm.reset();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  // create password
  const [createPasswordInputs, setCreatePasswordInputs] = useState<
    CreatePasswordField[]
  >([
    {
      id: 2,
      field: "password",
      label: "Password",
      placeHolder: "",
      isShown: false,
    },
    {
      id: 3,
      field: "confirm_password",
      label: "Confirm Password",
      placeHolder: "",
      isShown: false,
    },
  ]);

  const changePasswordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const [sendRequestCreatePassword, { isLoading: isLoadingCreatePassword }] =
    useCreatePasswordMutation();
  const onSubmitCreatePassword = async (
    data: z.infer<typeof changePasswordSchema>,
  ) => {
    // remove the confirm_new_password
    // eslint-disable-next-line -- remove confirm_password from data
    const { confirm_password, ...newData } = data;

    await sendRequestCreatePassword(newData)
      .unwrap()
      .then(() => {
        toast({
          description: "Password created successfully",
        });

        void refetch();
        changePasswordForm.reset();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  /*  const toggleConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };*/

  const handleShowPassword = (id: number) => {
    setPasswordInputs((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, isShown: !setting.isShown } : setting,
      ),
    );
  };

  const handleShowPasswordCreate = (id: number) => {
    setCreatePasswordInputs((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, isShown: !setting.isShown } : setting,
      ),
    );
  };

  // const [authenticationSettings, setAuthenticationSettings] = useState([
  //   {
  //     id: 1,
  //     title: "Enable Authentication",
  //     description: "Activate additional security measures for your account",
  //     isToggled: false,
  //   },
  // ]);

  // const [factorAuthenticators, setFactorAuthenticators] = useState([
  //   {
  //     id: 1,
  //     title: "SMS",
  //     description: "Receive a one-time passcode via SMS",
  //     isToggled: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Email",
  //     description: "Receive a one-time passcode via email",
  //     isToggled: true,
  //   },
  //   {
  //     id: 3,
  //     title: "Authenticator App",
  //     description: "Receive a one-time passcode via app",
  //     isToggled: true,
  //   },
  // ]);

  /*  const handleToggleChange = (id: number) => {
    setAuthenticationSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isToggled: !setting.isToggled }
          : setting,
      ),
    );
  };*/

  // const handleToggleChange = (id: number) => {
  //   setAuthenticationSettings((prevSettings) =>
  //     prevSettings.map((setting) =>
  //       setting.id === id
  //         ? { ...setting, isToggled: !setting.isToggled }
  //         : setting,
  //     ),
  //   );
  // };

  // const handleToggleFactorChange = (id: number) => {
  //   setFactorAuthenticators((prevSettings) =>
  //     prevSettings.map((setting) =>
  //       setting.id === id
  //         ? { ...setting, isToggled: !setting.isToggled }
  //         : setting,
  //     ),
  //   );
  // };

  return (
    <div className="space-y-10 p-10">
      {userProfileIsLoading ? (
        <div className="flex items-center justify-center p-8">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
            <h1 className="text-xl text-slate-600">
              {" "}
              {userProfile?.userDetails.password
                ? "Change Password"
                : "Create Password"}
            </h1>
            <Separator />
            {userProfile?.userDetails.password ? (
              <Form {...securityForm}>
                <form
                  onSubmit={securityForm.handleSubmit(onSubmit)}
                  className="space-y-12"
                >
                  <div className="lex w-[400px] flex-col space-y-4 py-4">
                    {passwordInputs.map((password) => (
                      <div key={password.id}>
                        <FormField
                          control={securityForm.control}
                          name={password.field}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{password.label}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    autoComplete="off"
                                    type={
                                      password.isShown ? "text" : "password"
                                    }
                                    placeholder={password.placeHolder}
                                    {...field}
                                  />
                                  <button
                                    tabIndex={-1}
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-2"
                                    onClick={() => {
                                      handleShowPassword(password.id);
                                    }}
                                  >
                                    {password.isShown ? (
                                      <EyeIcon />
                                    ) : (
                                      <EyeOffIcon />
                                    )}
                                  </button>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button className="w-[150px] text-xl" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <LoadingSpinner /> Saving
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <Form {...changePasswordForm}>
                <form
                  onSubmit={changePasswordForm.handleSubmit(
                    onSubmitCreatePassword,
                  )}
                  className="space-y-12"
                >
                  <div className="lex w-[400px] flex-col space-y-4 py-4">
                    {createPasswordInputs.map((password) => (
                      <div key={password.id}>
                        <FormField
                          control={changePasswordForm.control}
                          name={password.field}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{password.label}</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    autoComplete="off"
                                    type={
                                      password.isShown ? "text" : "password"
                                    }
                                    placeholder={password.placeHolder}
                                    {...field}
                                  />
                                  <button
                                    tabIndex={-1}
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center px-2"
                                    onClick={() => {
                                      handleShowPasswordCreate(password.id);
                                    }}
                                  >
                                    {password.isShown ? (
                                      <EyeIcon />
                                    ) : (
                                      <EyeOffIcon />
                                    )}
                                  </button>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Button
                      className="w-[150px] text-xl"
                      disabled={isLoadingCreatePassword}
                    >
                      {isLoadingCreatePassword ? (
                        <>
                          <LoadingSpinner /> Saving
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
          {/* hide the authentication for now */}
          {/* <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
        <h1 className="text-xl text-slate-600"> Authentication</h1>
        <Separator />
        {authenticationSettings.map((settings) => (
          <ToggleData
            id={settings.id}
            title={settings.title}
            description={settings.description}
            isToggled={settings.isToggled}
            key={settings.id}
            onToggleChange={() => {
              handleToggleChange(settings.id);
            }}
          />
        ))}
      </div>
      {authenticationSettings[0].isToggled ? (
        <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
          <h1 className="text-xl text-slate-600"> Two Factor Authentication</h1>
          <Separator />
          {factorAuthenticators.map((setting) => (
            <ToggleData
              id={setting.id}
              title={setting.title}
              description={setting.description}
              isToggled={setting.isToggled}
              key={setting.id}
              onToggleChange={() => {
                handleToggleFactorChange(setting.id);
              }}
            />
          ))}
        </div>
      ) : null} */}
        </>
      )}
    </div>
  );
}
