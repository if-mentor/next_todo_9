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
        alert(e);
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
