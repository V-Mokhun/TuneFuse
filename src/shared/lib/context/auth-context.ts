import type { AuthSession } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";
import { type Writable } from "svelte/store";

export enum Context {
  AUTH_SESSION = "AUTH_SESSION_CONTEXT",
}

export const setSessionContext = (value: Writable<AuthSession | null>) =>
  setContext(Context.AUTH_SESSION, value);
export const getSessionContext: () => Writable<AuthSession | null> = () =>
  getContext(Context.AUTH_SESSION);
