import React, { useContext, useState, useEffect } from "react";
import FormArea from "@/components/FormArea";
import Layout from "@/components/Layout";
import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    try {
      //firebase宛にemail、passwordを送り、ログイン認証をする。
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        if (e instanceof FirebaseError) {
          if (e.code === "auth/invalid-email") {
            alert("メールアドレスの形式が間違っています");
          } else if (e.code === "auth/user-disabled") {
            alert("指定のアドレスのユーザが無効になっています");
          } else if (e.code === "auth/user-not-found") {
            alert("指定のアドレスのユーザが存在しません");
          } else if (e.code === "auth/wrong-password") {
            alert("指定のアドレスのパスワードが間違っています");
          } else if (e.code === "auth/too-many-requests") {
            alert("何度もパスワードを間違えました");
          } else if (e.code === "auth/internal-error") {
            alert("何かしらのエラーが発生しました。入力内容をご確認ください");
          } else {
            alert(e);
          }
        }
      }
    }
  };
  return (
    <>
      <Layout>
        <FormArea
          button="LOGIN"
          onClick={onClickLogin}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </Layout>
    </>
  );
};

export default login;
