import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormArea from "@/components/FormArea";
import Layout from "@/components/Layout";
import { auth } from "../libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

type USER = {
  id: string;
};
const signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickSignUp = async () => {
    try {
      //firebase宛にemail、passwordを送り、新規ユーザー登録をする。
      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        if (e.code === "auth/invalid-email") {
          alert("メールアドレスの形式が間違っています");
        } else if (e.code === "auth/email-already-in-use") {
          alert("指定のアドレスのユーザはすでに存在しています");
        } else if (e.code === "auth/internal-error") {
          alert("何かしらのエラーが発生しました。入力内容をご確認ください");
        } else {
          alert(e);
        }
      }
    }
  };
  return (
    <>
      <Layout>
        <FormArea
          button="SIGN UP"
          onClick={onClickSignUp}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </Layout>
    </>
  );
};

export default signup;
