"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../navbar/Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

function RegisterModal() {
  //Register modal
  const registerModal = useRegisterModal();
  // Login Modal
  const loginModal=useLoginModal()

  //Check is loading state
  const [isLoading, setIsLoading] = useState(false);

  //Toggle modal
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);



  //React form field
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  //On submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    //During the form submission set isLoading true
    setIsLoading(true);
    //Send the data to the api
    axios
      .post(`/api/register`, data)
      .then(() => {
        //Close the modal if registration successful
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an Account" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="text"
        required
      />
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
          Already have an account?
          <span
            // onClick={onToggle}
            onClick={toggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
