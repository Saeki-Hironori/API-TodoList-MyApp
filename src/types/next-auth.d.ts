// [...nextauth]で発生するidの型エラー解消のためのファイル

import type { DefaultUser } from "next-auth";

// sessionがデフォルトでemail,image,nameしか持たない為、id(uid)を拡張させる
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
