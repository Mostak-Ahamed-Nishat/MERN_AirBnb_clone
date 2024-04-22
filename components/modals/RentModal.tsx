"use client";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

//Initial value
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  //set default value of current page steps
  const [step, setStep] = useState(STEPS.CATEGORY);

  //React hooks form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  //Get the category value
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  //set the custom value to the form
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //function for going back page
  const onBack = () => {
    setStep((value) => value - 1);
  };

  //function for going forward page
  const onNext = () => {
    setStep((value) => value + 1);
  };

  //***Action label***
  const actionLabel = useMemo(() => {
    //check if the current label is price then create post otherwise go to next
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  //***Secondary Action label***
  const secondActionLabel = useMemo(() => {
    //if the category is not selected then return undefined
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  //First body Content category page
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FF5A5F]">
        {/* get the categories array */}
        {categories.map((item, index) => (
          <div key={index} className="col-span-1">
            <CategoryInput
              // Fetch all the categories from the categories list and set the category to the react hook form using setCustomValue function
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    />
  );
};

export default RentModal;
