"use client";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../navbar/Button";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

function LoginModal() {
  //
  const router = useRouter();
  //Login modal
  const loginModal = useLoginModal();

  //Register modal
  const registerModal = useRegisterModal();
  //Check is loading state
  const [isLoading, setIsLoading] = useState(false);

  //Toggle modal
  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  //React form field
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //On submit handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //During the form submission set isLoading true
    setIsLoading(true);
    //Send the data to the api

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Login successful");
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        toast.error("Invalid Credentials");
      }
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome Back" subtitle="Login to your Account" />

      <p>nishat@gmail.com</p>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="email"
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          First time using Airbnb ?
          <span
            // onClick={onToggle}
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default LoginModal;
