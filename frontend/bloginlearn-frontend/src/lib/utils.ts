import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_URL = "https://journal-ten-jet.vercel.app/api/"
export const ENDPOINTS = {
  //user
  signup: "signup/",
  login: "login/",
  userDetail: "user/",
  logout: "logout/",
  //containers
  listContainers: "listcontainers/",
  createContainers: "createcontainer/",
  deleteContainer: 'deletecontainer/',
  editContainer: (pk: number) => `editcontainer/${pk}/`,
  //tokens
  obtainTokens: "token/",
  refreshToken: 'token/refresh/',
  verifyToken: 'token/verify/',
  //entries
  createEntry: 'entries/'
}