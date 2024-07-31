import FormLogin from "@/components/form/form-login";
import LoginPage from "@/components/form/form-login";
import AuthLayout from "@/components/layouts/auth-layout";
import MainLayout from "@/components/layouts/main-layout";
import React from "react";

export default function PageLogin() {
  return (
    <>
        <AuthLayout>
          <FormLogin />
        </AuthLayout>
    </>
  );
}
