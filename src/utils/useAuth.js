import { useClerk } from "@clerk/clerk-react";
import { useCallback } from 'react';

function useAuth() {
  const { openSignIn, signOut, openSignUp } = useClerk();

  const signInWithCredentials = useCallback(() => {
    return openSignIn();
  }, [openSignIn]);

  const signUpWithCredentials = useCallback(() => {
    return openSignUp();
  }, [openSignUp]);

  const signInWithGoogle = useCallback(() => {
    return openSignIn({ strategy: "oauth_google" });
  }, [openSignIn]);

  const signInWithFacebook = useCallback(() => {
    return openSignIn({ strategy: "oauth_facebook" });
  }, [openSignIn]);

  const signInWithTwitter = useCallback(() => {
    return openSignIn({ strategy: "oauth_twitter" });
  }, [openSignIn]);

  const signInWithApple = useCallback(() => {
    return openSignIn({ strategy: "oauth_apple" });
  }, [openSignIn]);

  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut,
  }
}

export default useAuth;