"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import React, { useCallback } from "react";
import { IconType } from "react-icons";

type Props = {
  icon: IconType;
  label: string;
  selected?: boolean;
};

function CategoryBox({ icon: Icon, label, selected }: Props) {
  //Route parameters
  const router = useRouter();

  //parameters react hooks
  const params = useSearchParams();

  //cache the function definition using useCallback hooks
  const handleClick = useCallback(() => {
    
    // query parameter object
    let currentQuery = {};

    //If any params are available in the url get the parameter and store in the currentQuery variable
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //IF except category others query available keep all the query
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //if already selected any category after that if we click that again then remove the category
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    //generate the url after select the category
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected ? "border-b-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={26} />
      <div className="font-medium text-xs">{label}</div>
    </div>
  );
}

export default CategoryBox;
