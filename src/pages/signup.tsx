import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import FormArea from "@/components/FormArea";
import Layout from "@/components/Layout";
import { auth } from "../libs/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "@firebase/util";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
type USER = {
  id: string;
};
const signup = () => {
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
  const onClickSignUp = async () => {
    try {
      //firebase宛にemail、passwordを送り、新規ユーザー登録をする。
      const user = await createUserWithEmailAndPassword(auth, email, password);
      //Context宛にemail、passwordを送り、ユーザー情報を保管する。
      setUserInfo({ id: user.user.uid });
      //サインアップ画面からTODO一覧に自動遷移させる
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
