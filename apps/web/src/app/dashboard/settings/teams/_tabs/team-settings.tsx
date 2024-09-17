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
  Textarea,
  toast,
} from "@repo/ui/components/ui";
// import ToggleData from "@/src/app/dashboard/settings/teams/_components/toggle-data.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  useUpdateTeamMutation,
  useGetTeamMembersQuery,
} from "@repo/redux-utils/src/endpoints/manage-team";
import { useEffect, useState } from "react";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";
import { LoadingSpinner } from "@repo/ui/loading-spinner.tsx";
import { UpdateTeamSchema } from "../schemas/teams-schemas";
import UploadImage from "../_components/upload-image";

interface TeamDetailsProps {
  team: Team;
  refetchTeamList: () => void;
}

interface Team {
  _id: string;
  team: string;
  description: string;
  // eslint-disable-next-line -- team members type is still unknown
  team_members: any[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

export default function TeamSettings(props: TeamDetailsProps) {
  const {
    data: team,
    isLoading,
    refetch,
  } = useGetTeamMembersQuery(props.team._id);

  useEffect(() => {
    void refetch();
  }, [props.team]);

  useEffect(() => {
    if (team) {
      form.reset({
        team: team.team,
        description: team.description,
      });
    }
  }, [team]);

  const form = useForm<z.infer<typeof UpdateTeamSchema>>({
    resolver: zodResolver(UpdateTeamSchema),
    defaultValues: {
      team: "",
      description: "",
    },
  });

  const [sendRequest, { isLoading: isUpdateTeamLoading }] =
    useUpdateTeamMutation();
  function onSubmit(data: z.infer<typeof UpdateTeamSchema>) {
    sendRequest({ teamId: props.team._id, payload: data })
      .unwrap()
      .then(() => {
        toast({
          description: "Team updated successfully",
        });

        props.refetchTeamList();
      })
      .catch((e: unknown) => {
        toast({
          description: getErrorMessage(e),
        });
      });
  }

  const [profileSrc, setProfileSrc] = useState<string>(
    "/assets/images/logo.png",
  );

  // useEffect(() => {
  //   if (userProfile?.userInfo) {
  //     // Set the image source of profile picture
  //     setProfileSrc(
  //       userProfile.userInfo.profile?.image_1.path ?? "/assets/images/logo.png",
  //     );

  //     profileForm.reset({
  //       first_name: userProfile.userInfo.first_name,
  //       last_name: userProfile.userInfo.last_name,
  //       birthday: formatDate(userProfile.userInfo.birthday),
  //       gender: userProfile.userInfo.gender,
  //       contact_no: userProfile.userInfo.contact_no.toString(),
  //       city: userProfile.userInfo.city,
  //       state: userProfile.userInfo.state,
  //       zipCode: userProfile.userInfo.zipCode.toString(),
  //       address: userProfile.userInfo.address,
  //     });
  //   }
  // }, [userProfile, profileForm]);

  const handleSetProfileSrc = (src: string) => {
    setProfileSrc(src);
  };

  // hide settings for now
  // const [settings, setSettings] = useState([
  //   {
  //     id: 1,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Allow to edit team settings",
  //     description: "Allow User to edit the settings of the team.",
  //     isChecked: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  //   {
  //     id: 4,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: false,
  //   },
  //   {
  //     id: 5,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  //   {
  //     id: 6,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  //   {
  //     id: 7,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  //   {
  //     id: 8,
  //     title: "Send Messages",
  //     description: "Allow user to send messages.",
  //     isChecked: true,
  //   },
  // ]);
  // const handleToggleChange = (id: number) => {
  //   setSettings((prevSettings) =>
  //     prevSettings.map((setting) =>
  //       setting.id === id
  //         ? { ...setting, isChecked: !setting.isChecked }
  //         : setting,
  //     ),
  //   );
  // };
  return (
    <div className="relative">
      {isLoading ? (
        <div className="m-auto flex h-full flex-col items-center justify-center space-y-6">
          <LoadingSpinner />
          <p>Loading, please wait...</p>
        </div>
      ) : (
        <>
          {/* TODO: remove this */}
          <p className="hidden">{props.team.team}</p>
          <div className="flex flex-wrap gap-10 p-8">
            <div className="flex w-[200px] flex-col justify-start">
              <div className="my-4 flex h-[200px] w-[200px] flex-col content-center rounded-full bg-slate-200 shadow-lg">
                <Image
                  src={profileSrc}
                  alt=""
                  onError={() => {
                    setProfileSrc("/assets/images/logo.png");
                  }}
                  width={138}
                  height={141}
                  className="m-auto size-[150px] w-[150px] object-contain transition-all duration-500"
                />
              </div>
              <UploadImage
                handleSetProfileSrc={handleSetProfileSrc}
                teamId={props.team._id || ""}
              />
              {/* <Button variant="outline"> Upload Image</Button> */}
              {/* <p className=" text-center text-[12px] italic text-slate-300">
              We recommend an image of at least 512x512 resolution.
            </p> */}
            </div>

            <div className="block flex flex-col space-y-4 font-poppins">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-[600px] max-w-[600px] space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="team"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TEAM NAME</FormLabel>
                        <FormControl>
                          <Input placeholder="Marketing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TEAM DESCRIPTION</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us a little bit about your team"
                            className="h-[200px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isUpdateTeamLoading}>
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>

              {/* <div>
              <p> TEAM NAME </p>
              <input
                type="text"
                placeholder="MARKETING"
                className="w-= w-[300px] bg-slate-100"
              />
            </div>
            <div>
              <p> TEAM DESCRIPTION </p>
              <Textarea
                className="mt-2 h-[200px] w-[600px] resize-none bg-slate-100 font-light leading-7 text-slate-400"
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ac
              consequat arcu. Maecenas sagittis odio at diam varius commodo.
              Vestibulum viverra ante eu diam imperdiet dignissim."
              />
            </div> */}
            </div>
            {/*        <p className="flex flex-col justify-end text-[12px] font-light  italic text-slate-400">
            Date created June 25, 2024
          </p>*/}
          </div>
          {/* hide team settings for now */}
          {/* <Separator />
        <div className="mt-10 flex justify-between font-poppins">
          <p className="text-sm font-bold text-slate-500">MANAGE TEAMS</p>
        </div>
        <Separator />
        <div className="mt-4 space-y-4">
          {settings.map((permission) => (
            <ToggleData
              id={permission.id}
              title={permission.title}
              description={permission.description}
              isToggled={permission.isChecked}
              key={permission.id}
              onToggleChange={() => {
                handleToggleChange(permission.id);
              }}
            />
          ))}
        </div> */}
        </>
      )}
    </div>
  );
}
