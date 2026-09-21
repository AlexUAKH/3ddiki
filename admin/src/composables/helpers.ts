import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

export const useHelpers = () => {
  const { t } = useI18n();

  const formateDate = (date: Date) => {
    return date ? dayjs(date).format("DD-MM-YYYY") : "-";
  };

  const downloadFile = (file: Blob, fileName: string = "export.pdf") => {
    const downloadUrl = window.URL.createObjectURL(new Blob([file]));
    const link = document.createElement("a");

    link.href = downloadUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const debounce = (fn: any, delay: number) => {
    var timeoutID: any = null;

    return function (...args: any) {
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const errorMessage = (e: any, fallBackMessage?: string) =>
    e.response.data?.result?.message ||
    e.response.data?.message ||
    fallBackMessage ||
    "Check your login and password";

  return {
    formateDate,
    downloadFile,
    debounce,
    errorMessage,
  };
};
