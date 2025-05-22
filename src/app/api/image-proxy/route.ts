import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const imageUrl = searchParams.get("url");

  






}