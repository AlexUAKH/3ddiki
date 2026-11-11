import dayjs from "dayjs";
import { useI18n } from "vue-i18n";

export const useHelpers = () => {
  const { t } = useI18n();

  const formateDate = (date: string, time: boolean = false) => {
    const format = time ? "DD-MM-YYYY HH:mm:ss" : "DD-MM-YYYY";
    return date ? dayjs(date).format(format) : "-";
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

  const errorMessage = (e: any, fallBackMessage?: string): string =>
    e.response.data?.result?.message ||
    e.response.data?.message ||
    fallBackMessage ||
    "Something went wrong";

  return {
    formateDate,
    downloadFile,
    debounce,
    errorMessage,
  };
};
