"use client";

import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";
import React from "react";

const ManagerSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManager] = useUpdateManagerSettingsMutation();

  console.log('authUser:', authUser); // 데이터 구조 확인용

  if (isLoading) return <>Loading...</>;
  if (!authUser) return <>No user data found.</>;

  const initialData = {
    name: authUser.userInfo?.name || '',
    email: authUser.userInfo?.email || '',
    phoneNumber: authUser.userInfo?.phoneNumber || '',
  };

  const handleSubmit = async (data: typeof initialData) => {
    if (!authUser.cognitoInfo?.userId) return;
    
    await updateManager({
      cognitoId: authUser.cognitoInfo.userId,
      ...data,
    });
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
};

export default ManagerSettings;