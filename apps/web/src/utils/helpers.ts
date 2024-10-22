import { toast, type ToastProps } from "@repo/ui/components/ui";
import { getErrorMessage } from "@repo/hooks-and-utils/error-utils";

export const handlePromiseRejection = async (
  func: () => Promise<void> | void,
  toastProps?: ToastProps,
  onFinish?: () => void,
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
  } finally {
    onFinish?.();
  }
};
