
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#ffffff] font-inter p-4">
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>
            <SignIn
                path="/account/signin"
                routing="path"
                signUpUrl="/account/signup"
                forceRedirectUrl="/dashboard"
                appearance={{
                    elements: {
                        rootBox: "mx-auto",
                        card: "bg-white/5 border border-white/10 backdrop-blur-sm",
                    }
                }}
            />
        </div>
    );
}
