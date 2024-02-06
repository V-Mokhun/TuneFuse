import { writable } from "svelte/store";
import type { Tables } from "..";

export const songs = writable<Tables<"songs">[]>([]);
