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
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";
import { securitySchema } from "../schemas/personal-settings-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSendResetPasswordMutation } from "@repo/redux-utils/src/endpoints/forgot-password";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { useChangePasswordMutation } from "@repo/redux-utils/src/endpoints/user";

export default function SecurityTab() {
  /* const [showConfirmPassword, setConfirmShowPassword] = useState(false);*/

  // password types
  type PasswordField = {
    id: number;
    field: "current_password" | "new_password" | "confirm_new_password";
    label: string;
    placeHolder: string;
    isShown: boolean;
  };

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
    const { confirm_new_password, ...newData } = data;

    await sendRequest(newData)
      .unwrap()
      .then(() => {
        toast({
          description: "Password changed successfully",
        });
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

  const [authenticationSettings, setAuthenticationSettings] = useState([
    {
      id: 1,
      title: "Enable Authentication",
      description: "Activate additional security measures for your account",
      isToggled: false,
    },
  ]);

  const [factorAuthenticators, setFactorAuthenticators] = useState([
    {
      id: 1,
      title: "SMS",
      description: "Receive a one-time passcode via SMS",
      isToggled: true,
    },
    {
      id: 2,
      title: "Email",
      description: "Receive a one-time passcode via email",
      isToggled: true,
    },
    {
      id: 3,
      title: "Authenticator App",
      description: "Receive a one-time passcode via app",
      isToggled: true,
    },
  ]);

  /*  const handleToggleChange = (id: number) => {
    setAuthenticationSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isToggled: !setting.isToggled }
          : setting,
      ),
    );
  };*/

  const handleToggleChange = (id: number) => {
    setAuthenticationSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isToggled: !setting.isToggled }
          : setting,
      ),
    );
  };

  const handleToggleFactorChange = (id: number) => {
    setFactorAuthenticators((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id
          ? { ...setting, isToggled: !setting.isToggled }
          : setting,
      ),
    );
  };

  return (
    <div className="space-y-10 p-10">
      <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
        <h1 className="text-xl text-slate-600"> Change Password</h1>
        <Separator />
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
                              autoCapitalize="off"
                              type={password.isShown ? "text" : "password"}
                              placeholder={password.placeHolder}
                              {...field}
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 flex items-center px-2"
                              onClick={() => {
                                handleShowPassword(password.id);
                              }}
                            >
                              {password.isShown ? <EyeIcon /> : <EyeOffIcon />}
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
      </div>
      <div className="flex w-[200px] w-full flex-col space-y-2 border-2 border-gray-300 px-7 py-6">
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
      ) : null}
    </div>
  );
}
