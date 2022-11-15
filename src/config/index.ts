import { env } from "../utils/utils";

export const PORT = env("PORT", "PORT");
export const API = env("API", "API");
export const APIKEY = env("APIKEY", "APIKEY");
export const MAXCALLS = env("MAXCALLS", "MAXCALLS");