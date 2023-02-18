import React, { useContext, useState, useEffect } from "react";
import FormArea from "@/components/FormArea";
import Layout from "@/components/Layout";
import { auth } from "../libs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { userAtom } from "../atom";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useAtom(userAtom);
  const router = useRouter();

  //最初に開いた時にuserInfoがあるときはトップに遷移させる
  useEffect(() => {
    if (userInfo.id) {
      router.push("/TodoTop");
    }
  }, []);

  const onClickLogin = async () => {
    try {
      //firebase宛にemail、passwordを送り、ログイン認証をする。
      const user = await signInWithEmailAndPassword(auth, email, password);
      //Context宛にemail、passwordを送り、ユーザー情報を保管する。
      setUserInfo({ id: user.user.uid });
      //ログイン画面からTODO一覧に自動遷移させる
      router.push("/TodoTop");
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
