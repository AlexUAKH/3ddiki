import $http from "@/plugins/axios";

export const useRadobot = () => {
  const extractImages = async (baseUrl: string, lessonNumber: number) => {
    return $http.post(
      "/radobot/image-downloader",
      {
        baseUrl,
        lessonNumber,
      },
      {
        responseType: "blob",
      },
    );
  };

  return {
    extractImages,
  };
};
