"use client";
import Image from "next/image";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  toast,
} from "@repo/ui/components/ui";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetUserProfileQuery,
  useUpdateUserInfoMutation,
} from "@repo/redux-utils/src/endpoints/user";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { profileSchema } from "../schemas/personal-settings-schemas";
import UploadImage from "./_components/upload-image";

export default function ProfileTab() {
  const [profileSrc, setProfileSrc] = useState<string>("");

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      birthday: "",
      gender: "",
      contact_no: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
    },
  });

  const {
    data: userProfile,
    isLoading: userProfileIsLoading,
    refetch,
  } = useGetUserProfileQuery(undefined);

  // Function to format date to YYYY-MM-DD
  const formatDate = (isoDate: string) => {
    return isoDate.split("T")[0];
  };

  // Update the form values when userProfile data is fetched
  useEffect(() => {
    if (userProfile?.userInfo) {
      // Set the image source of profile picture
      setProfileSrc(
        userProfile.userInfo.profile?.image_1.path ?? "/assets/images/logo.png",
      );

      profileForm.reset({
        first_name: userProfile.userInfo.first_name,
        last_name: userProfile.userInfo.last_name,
        birthday: formatDate(userProfile.userInfo.birthday),
        gender: userProfile.userInfo.gender,
        contact_no: userProfile.userInfo.contact_no.toString(),
        city: userProfile.userInfo.city,
        state: userProfile.userInfo.state,
        zipCode: userProfile.userInfo.zipCode.toString(),
        address: userProfile.userInfo.address,
      });
    }
  }, [userProfile, profileForm]);

  const [sendRequest, { isLoading }] = useUpdateUserInfoMutation();

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    // Convert contact_no and zipCode to numbers
    const formattedData = {
      ...data,
      contact_no: Number(data.contact_no),
      zipCode: Number(data.zipCode),
    };

    await sendRequest(formattedData)
      .unwrap()
      .then(() => {
        toast({
          title: "Profile Updated Successfully!",
        });

        void refetch();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  };

  const handleSetProfileSrc = (src: string) => {
    setProfileSrc(src);
  };

  return (
    <>
      <div className={`font-poppins ${userProfileIsLoading ? "" : "hidden"}`}>
        <div className="flex items-center justify-center p-8">
          <LoadingSpinner />
        </div>
      </div>

      <div className={`font-poppins ${userProfileIsLoading ? "hidden" : ""}`}>
        <div className="space-x-10 p-8">
          <div className="flex w-[200px] w-full items-center justify-between border-2 border-gray-300 px-10 py-6">
            <div className="flex items-center space-x-10">
              <div className="my-4 flex h-[120px] w-[120px] flex-col content-center overflow-hidden rounded-full bg-slate-200 shadow-lg">
                <Image
                  // src="/assets/images/logo.png"
                  src={profileSrc}
                  alt=""
                  onError={() => {
                    setProfileSrc("/assets/images/logo.png");
                  }}
                  width={138}
                  height={141}
                  className="m-auto size-[120px] w-[120px] object-contain transition-all duration-500"
                />
              </div>
              <div>
                <h1 className="text-xl">
                  {userProfile?.userInfo
                    ? `${userProfile.userInfo.first_name} ${userProfile.userInfo.last_name}`
                    : userProfile?.userDetails.email}{" "}
                </h1>
                <div className="w-[100px] rounded-md bg-orange-500">
                  <p className="text-center text-white">
                    {userProfile?.userDetails.role.role_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-[190px] flex-col justify-center">
              <UploadImage
                handleSetProfileSrc={handleSetProfileSrc}
                userId={userProfile?.userInfo ? userProfile.userInfo._id : ""}
              />

              <p className=" text-center text-[12px] italic text-slate-300">
                We recommend an image of at least 512x512 resolution.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onSubmit)}
              className="space-y-12 px-10 py-2"
            >
              <div className="space-y-2">
                <h1 className="text-xl text-slate-600">Personal Information</h1>
                <Separator />
                <div className="grid grid-cols-9 gap-10 p-4">
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="first_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="First Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="last_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Last Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Birth Date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger
                              className="text-md h-[40px] text-slate-500"
                              variant="outline"
                            >
                              <SelectValue placeholder="Select your gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-xl text-slate-600">Contact Information</h1>
                <Separator />
                <div className="grid grid-cols-9 gap-10 p-4">
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="contact_no"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Phone Number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-4 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZipCode</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Zip Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-8 space-y-2">
                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex items-end justify-end">
                  <Button className="w-[150px]" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoadingSpinner /> Updating
                      </>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
