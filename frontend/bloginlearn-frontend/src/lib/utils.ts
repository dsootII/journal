import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BACKEND_URL = "http://127.0.0.1:8000/api/"
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
  //tokens
  obtainTokens: "token/",
  refreshToken: 'token/refresh/',
  verifyToken: 'token/verify/',
  //entries
  createEntry: 'entries/'
}