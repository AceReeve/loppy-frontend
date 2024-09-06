import { toast, type ToastProps } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

export const handlePromiseRejection = async (
  func: () => Promise<void> | void,
  toastProps?: ToastProps,
): Promise<void> => {
  try {
    await func();
  } catch (e) {
    toast({
      variant: "destructive",
      description: getErrorMessage(e),
      title: "Error",
      ...toastProps,
    });
    throw e;
  }
};

// export const getTypingMessage = (typingData: string[]): string =>
//   typingData.length > 1
//     ? `${typingData.length + " participants are typing..."}`
//     : `${typingData[0] + " is typing..."}`;
//
// export const pushNotification = (
//   messages: { variant: NotificationVariantType; message: string }[],
//   func?: (messages: NotificationsType) => void,
// ): void => {
//   if (func) {
//     func(
//       messages.map(({ variant, message }) => ({
//         variant,
//         message,
//         id: new Date().getTime(),
//         dismissAfter: NOTIFICATION_TIMEOUT,
//       })),
//     );
//   }
// };
//
// export const successNotification = ({
//   message,
//   addNotifications,
// }: {
//   message: string;
//   addNotifications?: (messages: NotificationsType) => void;
// }): void => {
//   if (!addNotifications) {
//     return;
//   }
//   pushNotification(
//     [
//       {
//         message,
//         variant: "success",
//       },
//     ],
//     addNotifications,
//   );
// };
//
// export const unexpectedErrorNotification = (
//   e: string,
//   addNotifications?: (messages: NotificationsType) => void,
// ): void => {
//   if (!addNotifications) {
//     return;
//   }
//   pushNotification(
//     [
//       {
//         message: e,
//         variant: "error",
//       },
//     ],
//     addNotifications,
//   );
// };
