export default function EmailSent() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-2xl font-bold text-[#0B3B2E]">Check your email</h1>
                <p className="text-muted-foreground">
                    We’ve sent a verification link to your email address. Please check your inbox and click the link to verify your account.
                </p>
                <p className="text-sm text-muted-foreground">
                    Didn’t receive the email? Check your spam folder or wait a few minutes.
                </p>
            </div>
        </div>
    );
}