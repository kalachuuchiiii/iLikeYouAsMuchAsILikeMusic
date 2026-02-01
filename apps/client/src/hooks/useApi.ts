import myApi from "@src/lib/axios-instance";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { useEffect } from "react";
import { updateAccessToken } from "@src/features/auth/slice/authSlice";

export const useApi = () => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!accessToken) return;
    const requestId = myApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

  const responseId = myApi.interceptors.response.use(
  response => {
    return response;
  },
  async error => {

    if (!error.response) {
      return Promise.reject(error);
    }

    const { config, data } = error.response;

    if (data?.code === "TOKEN_EXPIRED_ERROR" && !config._retry) {
      config._retry = true;

      try {
        const res = await myApi.post("/auth/refresh");
        const newAccessToken = res.data.accessToken;

        dispatch(updateAccessToken({ accessToken: newAccessToken }));

        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return myApi(config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

    return () => {
      myApi.interceptors.request.eject(requestId);
      myApi.interceptors.response.eject(responseId);
    };
  }, [accessToken]);

  return myApi;
};
