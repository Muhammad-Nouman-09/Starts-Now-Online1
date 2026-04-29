import type { User } from "@supabase/supabase-js";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
};

export function getProfileFromUser(user: User, fullName?: string): UserProfile {
  const metadata = user.user_metadata ?? {};
  const email = user.email ?? "";
  const name =
    fullName?.trim() ||
    metadata.full_name ||
    metadata.name ||
    email.split("@")[0] ||
    "User";

  return {
    id: user.id,
    email,
    full_name: name,
    avatar_url: metadata.avatar_url || metadata.picture || null,
  };
}

export function getProfileInitials(profile: Pick<UserProfile, "full_name" | "email">) {
  const source = profile.full_name || profile.email;
  const initials = source
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "U";
}

export async function upsertUserProfile(user: User, fullName?: string) {
  const fallbackProfile = getProfileFromUser(user, fullName);

  if (!isSupabaseConfigured) {
    return fallbackProfile;
  }

  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: fallbackProfile.id,
        email: fallbackProfile.email,
        full_name: fallbackProfile.full_name,
        avatar_url: fallbackProfile.avatar_url,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    )
    .select("id,email,full_name,avatar_url")
    .maybeSingle();

  if (error) {
    console.warn("Unable to save Supabase profile:", error.message);
    return fallbackProfile;
  }

  return data ?? fallbackProfile;
}

export async function getUserProfile(user: User) {
  const fallbackProfile = getProfileFromUser(user);

  if (!isSupabaseConfigured) {
    return fallbackProfile;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,avatar_url")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    console.warn("Unable to load Supabase profile:", error.message);
    return fallbackProfile;
  }

  return data ?? upsertUserProfile(user);
}
