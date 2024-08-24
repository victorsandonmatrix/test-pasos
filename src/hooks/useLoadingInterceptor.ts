"use client";

import axiosInstance from "@/lib/axiosInstance";
import { hideLoader, showLoader } from "@/redux/states/loadingSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useLoadingInterceptor = () => {
  const dispatch = useDispatch();
  const [activeRequests, setActiveRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const incrementRequestCount = () => setActiveRequests((prev) => prev + 1);
    const decrementRequestCount = () => setActiveRequests((prev) => prev - 1);

    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        incrementRequestCount();
        if (!isLoading) {
          setIsLoading(true);
          dispatch(showLoader());
        }
        return config;
      },
      (error) => {
        decrementRequestCount();
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response: any) => {
        decrementRequestCount();
        return response;
      },
      (error: any) => {
        decrementRequestCount();
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (activeRequests === 0 && isLoading) {
      const delay = 300; // Tiempo mínimo de visualización del Loader (en ms)
      setTimeout(() => {
        dispatch(hideLoader());
        setIsLoading(false);
      }, delay);
    }
  }, [activeRequests, dispatch, isLoading]);
};
