// Copyright 2024 The Casdoor Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export default function middleware(req) {
  const casdoorUserCookie = req.cookies.get("casdoorUser");
  const isAuthenticated = casdoorUserCookie ? true : false;

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const casdoorLoginURL = `${
      process.env.CASDOOR_ENDPOINT
    }/login/oauth/authorize?client_id=${
      process.env.NEXT_PUBLIC_CASDOOR_CLIENT_ID
    }&response_type=code&redirect_uri=${encodeURIComponent(
      process.env.CASDOOR_REDIRECT_URI
    )}&scope=read&state=${process.env.CASDOOR_APPLICATION_NAME}`;

    return NextResponse.redirect(casdoorLoginURL);
  }
}
