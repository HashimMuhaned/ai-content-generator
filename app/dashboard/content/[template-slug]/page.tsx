"use client";

import React, { useState, useContext, useEffect, use } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/PostgressDB";
import { AIoutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { CreditUsageContext } from "@/app/(context)/CreditUsageUpdate";
import AlertDialogTemplate from "../../_components/AlertDialog";

interface PROP {
  params: Promise<{ "template-slug": string }>;
}

const CreateNewContent = (prop: PROP) => {
  const params = use(prop.params); // Unwrap the promise
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { updateCreditUsage, setUpdateCreditUsage } =
    useContext(CreditUsageContext);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (totalUsage >= 1000) {
      setDialogOpen(true);
    }
  }, [totalUsage]);

  // Find the selected template from the list of templates
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === params["template-slug"] // looking for a template Item that is matching the params
  );

  const [loadginAI, setLoadingAI] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const { user } = useUser();

  const GenerateAIContent = async (formData: any) => {
    setLoadingAI(true); // Set loading state to true
    const selectedPrompt = selectedTemplate?.aiPrompt; // Get the AI Prompt from the selected template
    const finalPrompt = JSON.stringify(formData) + "," + selectedPrompt; // Combine the form data with the AI Prompt

    // Make the API call here
    const result = await chatSession.sendMessage(finalPrompt); // Send the prompt to the AI model

    const aiResponseText = result?.response.text();
    // extract the generated text from the response
    setGeneratedContent(aiResponseText); // Set the generated text to the state

    await SaveInDB(formData, selectedTemplate?.slug, aiResponseText); // Save the generated text to the database

    setLoadingAI(false); // Set loading state to false

    setUpdateCreditUsage(Date.now());
  };

  const SaveInDB = async (formData: any, slug: any, aiRes: any) => {
    // Save the generated content to the database
    const result = await db.insert(AIoutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiRes,
      createdBy: user?.primaryEmailAddress?.emailAddress || "Hashim",
      createdAt: moment().format("DD/MM/YYYY"),
    });

    console.log(result); // Log the result to the console
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
      {/* Form Section */}
      <FormSection
        selectedTemplate={selectedTemplate}
        userFormInput={(v: any) => GenerateAIContent(v)}
        loading={loadginAI}
      />

      {/* Output Section - Reduce Width */}
      <div className="col-span-1 md:col-span-2">
        <OutputSection aiOutput={generatedContent} />
      </div>

      <div>
        <AlertDialogTemplate open={isDialogOpen} setOpen={setDialogOpen} />
      </div>
    </div>
  );
};
export default CreateNewContent;
