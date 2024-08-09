"use client";
import { Button, Separator } from "@repo/ui/components/ui";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";

export default function SecurityTab() {
  /* const [showConfirmPassword, setConfirmShowPassword] = useState(false);*/

  const [passwordInputs, setPasswordInputs] = useState([
    {
      id: 1,
      label: "Current Password",
      placeHolder: "",
      isShown: false,
    },
    {
      id: 2,
      label: "New Password",
      placeHolder: "",
      isShown: false,
    },
    {
      id: 3,
      label: "Confirm New Password",
      placeHolder: "",
      isShown: false,
    },
  ]);

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
        <div className="flex w-[400px] flex-col space-y-4 py-4">
          {passwordInputs.map((password) => (
            <div key={password.id}>
              <p className="text-sm">{password.label}</p>
              <div className="relative">
                <input
                  className="mt-1 h-[38px] w-full border-[#D0D3DB] font-medium shadow-none"
                  id="confirm_password"
                  placeholder={password.placeHolder}
                  type={password.isShown ? "text" : "password"}
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
                {/*          {errors.confirm_password ? (
            <p className="mt-2 text-[0.8rem] font-medium text-error">
              {errors.confirm_password.message}
            </p>
          ) : null}*/}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button className="w-[150px] text-xl">Save</Button>
        </div>
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
