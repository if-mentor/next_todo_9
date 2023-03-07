import React, { useContext, useState, useEffect } from "react";
import FormArea from "@/components/FormArea";
import Layout from "@/components/Layout";
import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useRouter } from "next/router";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onClickLogin = async () => {
    try {
      //firebase宛にemail、passwordを送り、ログイン認証をする。
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      //エラーがあったらエラー内容をアラートさせる
      if (e instanceof FirebaseError) {
        alert(e);
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
