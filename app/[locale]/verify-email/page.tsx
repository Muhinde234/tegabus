"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useVerifyEmail} from "@/hooks/useAuth";
import {useEffect} from "react";
import {toast} from "sonner";

export default function VarifyEmail() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const router = useRouter();

    const {mutate, isPending} = useVerifyEmail();


    useEffect(() => {
        if (!token) {
            toast.error('Verification token is missing or invalid');
            return;
        }

        mutate(
            { token },
            {
                onSuccess: (res) => {
                    toast.success(res.message || 'Email verified successfully!');
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                }
            }
        );
    }, [token, mutate, router]);


    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="text-center space-y-4">
                {isPending ? (
                    <div className="text-lg font-medium">Verifying your email...</div>
                ) : (
                    <div className="text-lg font-medium">One moment...</div>
                )}
            </div>
        </div>
    )
}