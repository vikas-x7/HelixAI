
import { createClerkClient } from '@clerk/backend';
import { getContext } from 'hono/context-storage';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
});

export const auth = async () => {
  try {
    const c = getContext();
    if (!c) return null;

    const request = c.req.raw;
    const { isSignedIn, toAuth } = await clerkClient.authenticateRequest(request);

    if (!isSignedIn) {
      return null;
    }

    const authData = toAuth();

    // Fetch user details if needed, or just return the auth data mapped to the old session format
    const user = await clerkClient.users.getUser(authData.userId);

    return {
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || user.username,
        image: user.imageUrl,
      }
    };
  } catch (error) {
    console.error("Clerk auth error:", error);
    return null;
  }
};