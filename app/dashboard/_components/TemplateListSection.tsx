"use client";

import React, { useEffect, useState } from "react";
import Templates from "@/app/(data)/Templates";
import TemplateCard from "./TemplateCard";

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

export interface TEMPLATE {
  name: string;
  desc: string;
  icon: string;
  category: string;
  slug: string;
  aiPrompt: string;
  form?: FORM[];
}

const TemplateListSection = ({ userSearchInput }: any) => {
  const [templatesList, setTemplatesList] = useState(Templates);
  useEffect(() => {
    console.log(userSearchInput);

    if (userSearchInput) {
      // looping the Template list and keeping the item that matches what the user has typed.
      const filteredList = Templates.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplatesList(filteredList);
    } else {
      setTemplatesList(Templates);
    }
  }, [userSearchInput]);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {templatesList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
};

export default TemplateListSection;
