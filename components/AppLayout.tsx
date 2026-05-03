"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  ChevronDown,
  Coins,
  LogOut,
  Menu,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { getProfileInitials, getUserProfile, type UserProfile } from "@/lib/profiles";

const cryptoTools = [
  { name: "Profit Calculator", path: "/calculator", icon: Calculator },
  { name: "Market", path: "/market", icon: Coins },
  { name: "Converter", path: "/converter", icon: ArrowLeftRight },
];

const officeTools: { name: string; path: string; icon: React.ElementType }[] = [];
const freelancerTools: { name: string; path: string; icon: React.ElementType }[] = [];
const businessTools: { name: string; path: string; icon: React.ElementType }[] = [];

const dropdowns = [
  { label: "Crypto", icon: Calculator, items: cryptoTools },
  { label: "Office", icon: Briefcase, items: officeTools },
  { label: "Freelancer", icon: Users, items: freelancerTools },
  { label: "Business", icon: Building2, items: businessTools },
];

const standaloneItems = [{ name: "Intelligence", path: "/blog", icon: BookOpen }];

function NavDropdown({
  label,
  icon: Icon,
  items,
  pathname,
}: {
  label: string;
  icon: React.ElementType;
  items: { name: string; path: string; icon: React.ElementType }[];
  pathname: string;
}) {
  const isActive = items.some((i) => i.path === pathname);
  const isEmpty = items.length === 0;

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-1 text-sm font-semibold tracking-tight transition-colors duration-200",
          isActive ? "text-emerald-400" : "text-zinc-400 hover:text-emerald-300"
        )}
        aria-label={`Open ${label} menu`}
      >
        {label}
        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
        <div className="bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden min-w-[220px]">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-l border-t border-zinc-800 rotate-45" />

          {isEmpty ? (
            <div className="flex flex-col items-center justify-center gap-2 py-6 px-6 text-center">
              <Icon className="w-5 h-5 text-zinc-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-300">Coming Soon</p>
              <p className="text-[10px] text-zinc-400 font-mono leading-relaxed">
                Tools will be added here shortly.
              </p>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <Link
                  key={item.path + item.name}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 text-xs font-semibold transition-all",
                    pathname === item.path
                      ? "text-emerald-400 bg-emerald-500/5"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileAvatar({ profile }: { profile: UserProfile }) {
  if (profile.avatar_url) {
    return (
      <img
        src={profile.avatar_url}
        alt={profile.full_name}
        className="h-9 w-9 rounded-full border border-emerald-400/30 object-cover"
      />
    );
  }

  return (
    <span className="grid h-9 w-9 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400 text-xs font-black text-zinc-950">
      {getProfileInitials(profile)}
    </span>
  );
}

function DesktopProfileMenu({
  profile,
  onSignOut,
}: {
  profile: UserProfile;
  onSignOut: () => void;
}) {
  return (
    <div className="relative group">
      
      <button className="flex h-10 w-[220px] items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-left transition-colors hover:border-emerald-400/40 " aria-label="Open profile menu">
        <ProfileAvatar profile={profile} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold text-white">{profile.full_name}</span>
          <span className="block truncate text-[10px] font-semibold uppercase tracking-widest text-zinc-300">
            Profile
          </span>
        </span>
        <ChevronDown className="h-3 w-3 shrink-0 text-zinc-300 transition-transform group-hover:rotate-180" />
      </button>

      <div className="absolute right-0 top-full z-50 pt-3 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto">
        <div className="w-72 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/50 backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-zinc-800 p-4">
            <ProfileAvatar profile={profile} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">{profile.full_name}</p>
              <p className="truncate text-xs text-zinc-300">{profile.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:bg-zinc-800/70 hover:text-white"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

function MobileProfilePanel({
  profile,
  onSignOut,
}: {
  profile: UserProfile;
  onSignOut: () => void;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-3">
      <div className="flex items-center gap-3">
        <ProfileAvatar profile={profile} />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">{profile.full_name}</p>
          <p className="truncate text-xs text-zinc-300">{profile.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onSignOut}
        aria-label="Sign out"
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:border-zinc-700 hover:text-white"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </div>
  );
}

export default function AppLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(!isSupabaseConfigured);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoaded(true);
      return;
    }

    let isMounted = true;

    const setProfileFromUser = async (user: SupabaseUser | null) => {
      if (!user) {
        if (isMounted) {
          setProfile(null);
          setAuthLoaded(true);
        }
        return;
      }

      const nextProfile = await getUserProfile(user);
      if (isMounted) {
        setProfile(nextProfile);
        setAuthLoaded(true);
      }
    };

    supabase.auth.getSession().then(({ data }) => {
      void setProfileFromUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      void setProfileFromUser(session?.user ?? null);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }

    setProfile(null);
    setIsMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  const desktopAuth = profile ? (
    <DesktopProfileMenu profile={profile} onSignOut={handleSignOut} />
  ) : (
    <div className="flex h-10 w-[220px] items-center justify-end gap-4">
      <Link
        href="/login"
        className="text-sm font-semibold text-zinc-400 hover:text-emerald-400 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="bg-emerald-400 text-zinc-950 px-5 py-2 rounded-lg text-sm font-semibold tracking-tight active:scale-95 transition-transform hover:bg-emerald-300"
      >
        Get Started
      </Link>
    </div>
  );

  return (
    <header className="h-16 shrink-0">
      <nav className="fixed top-0 w-full z-[100] bg-[#0F1113]/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-emerald-400">
              Starts Now
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {dropdowns.map((dd) => (
                <NavDropdown
                  key={dd.label}
                  label={dd.label}
                  icon={dd.icon}
                  items={dd.items}
                  pathname={pathname}
                />
              ))}
              {standaloneItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-semibold tracking-tight transition-colors duration-200",
                    pathname === item.path
                      ? "text-emerald-400"
                      : "text-zinc-400 hover:text-emerald-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex h-10 w-[220px] items-center justify-end">
            {authLoaded ? desktopAuth : <div className="h-10 w-[220px] animate-pulse rounded-lg bg-zinc-900" />}
          </div>

          <button
            className="md:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open mobile menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {dropdowns.map((dd) => (
              <div key={dd.label}>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 px-2 pb-2 flex items-center gap-2">
                  <dd.icon className="w-3 h-3" />
                  {dd.label}
                </p>
                {dd.items.length === 0 ? (
                  <p className="text-[10px] font-mono text-zinc-400 px-2 pb-2">Coming soon...</p>
                ) : (
                  dd.items.map((item) => (
                    <Link
                      key={item.path + item.name}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-2 rounded-lg",
                        pathname === item.path
                          ? "text-emerald-400 bg-emerald-500/5"
                          : "text-zinc-300 hover:text-white"
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </Link>
                  ))
                )}
              </div>
            ))}
            <div className="border-t border-zinc-800 pt-4">
              {standaloneItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 text-xs font-bold uppercase tracking-widest p-2 rounded-lg",
                    pathname === item.path
                      ? "text-emerald-400 bg-emerald-500/5"
                      : "text-zinc-300 hover:text-white"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-zinc-800 pt-4 flex flex-col gap-3">
              {!authLoaded ? (
                <div className="h-24 animate-pulse rounded-xl bg-zinc-900" />
              ) : profile ? (
                <MobileProfilePanel profile={profile} onSignOut={handleSignOut} />
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm font-semibold text-zinc-400 text-left px-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-emerald-400 text-zinc-950 px-5 py-2.5 rounded-lg text-sm font-semibold w-full active:scale-95 transition-transform text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
