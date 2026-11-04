import $http from "@/plugins/axios";

export const useRadobot = () => {
  const extractImages = async (baseUrl: string) => {
    return $http.post(
      "/radobot/image-downloader",
      {
        baseUrl,
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
