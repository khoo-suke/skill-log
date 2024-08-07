import { NextRequest } from "next/server";
import { supabase } from "@/utils/supabase";

export const authRequest = async (request: NextRequest) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtoken
  const { data, error } = await supabase.auth.getUser(token);
  if (error) {
    throw new Error("トークン無効");
  }
  return data.user;
};
