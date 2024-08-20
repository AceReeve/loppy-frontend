import { Button, Input, Separator } from "@repo/ui/components/ui";

export default function Page() {
  const statistics = [
    {
      id: 1,
      name: "Click",
      value: 0,
    },
    {
      id: 2,
      name: "Referrals",
      value: 0,
    },
    {
      id: 3,
      name: "Credits",
      value: 0,
    },
  ];
  const message =
    "Hi,\n\nAre you currently using texting for your business?\n\n" +
    "David wanted me to reach out and invite you to try out our business texting software, " +
    "Salesmsg.\n\nToday, people prefer to text. With Salesmsg, you can text online from your current number or get a new" +
    " local or toll-free number if you prefer.\n\nIf you’ve ever considered adding texting to your business, we can help." +
    "\n\nUse this special link below to try it free for 14-days.";

  return (
    <div className="space-y-8 p-4">
      <h1 className="text-2xl font-semibold text-slate-500">Referrals</h1>
      <div className="flex  justify-between rounded border p-4">
        <div className="w-[470px inline min-w-[470px]">
          <h1 className="text-md font-semibold">Give 25, Get 25</h1>
          <p className="text-sm">
            For every customer you refer, you&apos;ll get 25 free message
            credits! There is no limit to the amount of free credits you can
            earn.
          </p>
        </div>
        <div className="my-auto flex items-end space-x-4 ">
          <Button className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
            >
              <path
                d="M1 11C1 6.522 1 4.282 2.391 2.891C3.782 1.5 6.021 1.5 10.5 1.5C14.978 1.5 17.218 1.5 18.609 2.891C20 4.282 20 6.521 20 11C20 15.478 20 17.718 18.609 19.109C17.218 20.5 14.979 20.5 10.5 20.5C6.022 20.5 3.782 20.5 2.391 19.109C1 17.718 1 15.479 1 11Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M16.008 5.5H15.998M15 11C15 12.1935 14.5259 13.3381 13.682 14.182C12.8381 15.0259 11.6935 15.5 10.5 15.5C9.30653 15.5 8.16193 15.0259 7.31802 14.182C6.47411 13.3381 6 12.1935 6 11C6 9.80653 6.47411 8.66193 7.31802 7.81802C8.16193 6.97411 9.30653 6.5 10.5 6.5C11.6935 6.5 12.8381 6.97411 13.682 7.81802C14.5259 8.66193 15 9.80653 15 11Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Button>
          <Button className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 19L11.5698 7.92644L11.5825 7.93682L18.2819 0H16.0431L10.5856 6.46L6.25165 0H0.380163L7.31697 10.3386L7.31614 10.3377L0 19H2.23877L8.30628 11.8128L13.1285 19H19ZM5.3646 1.72727L15.7897 17.2727H14.0156L3.58206 1.72727H5.3646Z"
                fill="white"
              />
            </svg>
          </Button>
          <Button className="h-10 w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="20"
              viewBox="0 0 12 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.238 1.538C5.22244 0.553396 6.55768 0.000164749 7.95 0H10.65C10.8489 0 11.0397 0.0790175 11.1803 0.21967C11.321 0.360322 11.4 0.551088 11.4 0.75V4.35C11.4 4.54891 11.321 4.73968 11.1803 4.88033C11.0397 5.02098 10.8489 5.1 10.65 5.1H7.95C7.9303 5.1 7.9108 5.10388 7.8926 5.11142C7.8744 5.11896 7.85786 5.13 7.84393 5.14393C7.83001 5.15786 7.81896 5.1744 7.81142 5.1926C7.80388 5.2108 7.8 5.2303 7.8 5.25V7.2H10.65C10.764 7.19994 10.8766 7.22587 10.979 7.27583C11.0815 7.32579 11.1713 7.39846 11.2415 7.48832C11.3117 7.57817 11.3604 7.68285 11.3841 7.79439C11.4078 7.90593 11.4057 8.02139 11.378 8.132L10.478 11.732C10.4374 11.8943 10.3437 12.0384 10.2118 12.1413C10.0799 12.2442 9.91732 12.3001 9.75 12.3H7.8V18.75C7.8 18.9489 7.72098 19.1397 7.58033 19.2803C7.43968 19.421 7.24891 19.5 7.05 19.5H3.45C3.25109 19.5 3.06032 19.421 2.91967 19.2803C2.77902 19.1397 2.7 18.9489 2.7 18.75V12.3H0.75C0.551088 12.3 0.360322 12.221 0.21967 12.0803C0.0790175 11.9397 0 11.7489 0 11.55V7.95C0 7.85151 0.0193993 7.75398 0.0570903 7.66299C0.0947813 7.57199 0.150026 7.48931 0.21967 7.41967C0.289314 7.35003 0.371993 7.29478 0.462987 7.25709C0.553982 7.2194 0.651509 7.2 0.75 7.2H2.7V5.25C2.70016 3.85768 3.2534 2.52244 4.238 1.538ZM7.95 1.5C6.95544 1.5 6.00161 1.89509 5.29835 2.59835C4.59509 3.30161 4.2 4.25544 4.2 5.25V7.95C4.2 8.14891 4.12098 8.33968 3.98033 8.48033C3.83968 8.62098 3.64891 8.7 3.45 8.7H1.5V10.8H3.45C3.64891 10.8 3.83968 10.879 3.98033 11.0197C4.12098 11.1603 4.2 11.3511 4.2 11.55V18H6.3V11.55C6.3 11.3511 6.37902 11.1603 6.51967 11.0197C6.66032 10.879 6.85109 10.8 7.05 10.8H9.164L9.689 8.7H7.05C6.85109 8.7 6.66032 8.62098 6.51967 8.48033C6.37902 8.33968 6.3 8.14891 6.3 7.95V5.25C6.3 4.81239 6.47384 4.39271 6.78327 4.08327C7.09271 3.77384 7.51239 3.6 7.95 3.6H9.9V1.5H7.95Z"
                fill="white"
              />
            </svg>
          </Button>
          <Button>Referral Link</Button>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-semibold text-slate-500">Statistics</h1>
        <Separator />
        <div className="4px mt-4 flex w-full justify-between gap-10">
          {statistics.map((statistic) => (
            <div
              key={statistic.id}
              className=" flex h-[100px] w-full flex-col items-center justify-center rounded border"
            >
              <h1>{statistic.name}</h1>
              <p>{statistic.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-lg font-semibold text-slate-500">
          Send Referral to Email
        </h1>
        <Separator />
        <Input placeholder="Email Address" />
        <div className="rounded border p-4">
          <pre>{message}</pre>
        </div>
      </div>
      <div className="flex justify-end">
        <Button>Send Invite</Button>
      </div>
    </div>
  );
}
