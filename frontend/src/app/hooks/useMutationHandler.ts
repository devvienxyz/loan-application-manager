import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UseMutationOptions } from "@tanstack/react-query";
import React from "react";


export const useFormMutationHandler = (pathOnSuccess?: string) => {
  const navigate = useNavigate();

  const getMutationOptions = <TData = unknown, TVariables = unknown, TError = AxiosError<{ message?: string }>>(
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>,
    successCallback?: (data: TData, variables: TVariables, context: unknown) => unknown,
    errorCallback?: (error: TError, variables: TVariables, context: unknown) => unknown
  ): Pick<UseMutationOptions<TData, TError, TVariables>, "onSuccess" | "onError"> => {
    return {
      onSuccess: (data, variables, context) => {
        if (pathOnSuccess) {
          navigate(pathOnSuccess);
        }
        successCallback?.(data, variables, context);
      },
      onError: (err: TError, variables, context) => {
        // console.error("Mutation Error:", err);
        const reqErr = err as AxiosError<{ message?: string }>;
        const errMsg = reqErr.response?.data?.message ?? "Something went wrong. Please try again.";
        setErrorMsg(errMsg);
        errorCallback?.(err, variables, context);
      },
    };
  };

  return { getMutationOptions };
}
