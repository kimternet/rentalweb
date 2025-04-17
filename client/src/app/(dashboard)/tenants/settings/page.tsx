"use client";

import SettingsForm from "@/components/SettingsForm";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import React from "react";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant] = useUpdateTenantSettingsMutation();

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
    
    await updateTenant({
      cognitoId: authUser.cognitoInfo.userId,
      ...data,
    });
  };

  return (
    <SettingsForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
};

export default TenantSettings;