import { atom } from "jotai";

export const uidAtom = atom("");

export const userAtom = atom({ email: "", password: "" });
