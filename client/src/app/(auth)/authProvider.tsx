'use client';

import React, { useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button, Heading, Radio, RadioGroupField, useAuthenticator, View } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter, usePathname } from 'next/navigation';


//https://docs.amplify.aws/gen1/javascript/tools/libraries/configure-categories/
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,

        },
    },

});

const components = {
    Header() {
        return (
            <View className="mt-4 mb-7">
                <Heading level={3} className="!text-2xl !font-bold">
                    RENTAL
                    <span className="text-secondary-500 font-light hover:!text-primary-300">
                        APTMENT
                    </span>
                </Heading>
                <p className="text-muted-foreground mt-2">
                    <span className="font-bold">환영합니다!</span>
                    회원가입을 진행해주세요.
                </p>
            </View>
        );
    },
    SignIn: {
        Footer() {
            const { toSignUp } = useAuthenticator();
            return (
                <View className="text-center mt-4">
                    <p className="text-muted-foreground">
                        계정이 없으신가요?{" "}
                        <Button
                            onClick={toSignUp}
                            className="text-primary hover:underline bg-transparent border-none p-0"
                            >
                            회원가입
                        </Button>
                    </p>
                </View>
            );
        },
    },
    SignUp: {
        FormFields() {
            const { validationErrors } = useAuthenticator();

            return (
                <>
                    <Authenticator.SignUp.FormFields />
                    <RadioGroupField
                        legend="Role"
                        name="custom:role"
                        errorMessage={validationErrors?.["custom:role"]}
                        hasError={!!validationErrors?.["custom:role"]}
                        isRequired
                    >
                        <Radio value="tenant">Tenant</Radio>
                        <Radio value="manager">Manager</Radio>
                    </RadioGroupField>
                </>
            );
        },
        Footer() {
            const { toSignIn } = useAuthenticator();
            return (
                <View className="text-center mt-4">
                    <p className="text-muted-foreground">
                        이미 계정이 있으신가요?{" "}
                        <Button
                            onClick={toSignIn}
                            className="text-primary hover:underline bg-transparent border-none p-0"
                            >
                            로그인
                        </Button>
                    </p>
                </View>
            );
        },
    },
};



const formFields ={
    signIn: {
        username: {
            placeholder: "이메일을 입력해주세요.",
            label: "Email",
            isRequired: true
        },
        password: {
            placeholder: "비밀번호를 입력해주세요.",
            label: "Password",
            isRequired: true
        }
    },
    signUp: {
        username: {
            order: 1,
            placeholder: "이름을 입력해주세요.",
            label: "Username",
            isRequired: true
        },
        email: {
            order: 2,
            placeholder: "이메일을 입력해주세요.",
            label: "Email",
            isRequired: true
        },
        password: {
            order: 3,
            placeholder: "비밀번호를 입력해주세요.",
            label: "Password",
            isRequired: true
        },
        confirm_password: {
            order: 4,
            placeholder: "비밀번호를 한번 더 입력해주세요.",
            label: "Confirm Password",
            isRequired: true
        },
    },
};

const Auth = ({ children }: {children: React.ReactNode}) => {
    const { user } = useAuthenticator((context) => [context.user]);
    const router = useRouter();
    const pathname = usePathname();

    const isAuthPage = pathname.match(/^\/(signin|signup)$/);
    const isDashboardPage = pathname.startsWith("/manager") || pathname.startsWith("/tenant");

    // Redirect authenticated users away from auth pages 인증된 사용자를 인증 페이지에서 리다이렉트
    useEffect(() => {
        if (user && isAuthPage) {
            router.push("/")
        }
    }, [user, isAuthPage, router]);

    // Allow access to public pages without authentication 인증 없이 공공 페이지에 접근
    if (!isAuthPage && !isDashboardPage) {
        return <>{children}</>;
    }


    return (
      <div className="h-full">
        <Authenticator
            initialState={pathname.includes("signup") ? "signUp" : "signIn"}
            components={components}
            formFields={formFields}
        >
            {() => <>{children}</>}
        </Authenticator>
      </div>
    );
};

export default Auth;