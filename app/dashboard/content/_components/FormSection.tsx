import React, { useState, useEffect, useContext } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon } from "lucide-react";
import { eq } from "drizzle-orm";
import { db } from "@/utils/PostgressDB";
import { useUser } from "@clerk/nextjs";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import AlertDialogTemplate from "../../_components/AlertDialog";
import { AIoutput } from "@/utils/schema";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput?: any;
  loading?: boolean;
}

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
  const [formData, setFormData] = useState<any>({});
  const [openDialog, setOpenDialog] = useState(false); // Controls the alert dialog
  const { user } = useUser();
  const { totalUsage } = useContext(TotalUsageContext);

  const getData = async () => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email address is undefined.");
      return;
    }

    const result =
      (await db.select().from(AIoutput).where(eq(AIoutput.createdBy, email))) ||
      [];
    getTotalUsage(result);
  };

  const getTotalUsage = (result: any) => {
    let total: number = 0;
    result.forEach((element: any) => {
      total += total + Number(element.aiResponse?.length);
    });
  };

  useEffect(() => {
    if (user) getData();
  }, [user, totalUsage]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (totalUsage >= 1000) {
      setOpenDialog(true); // Show the dialog
      return;
    }

    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md border rounded-lg bg-white">
      <Image
        src={selectedTemplate?.icon || ""}
        width={70}
        height={70}
        alt="icon"
      />
      <h2 className="font-bold text-2xl mb-2 text-primary">
        {selectedTemplate?.name}
      </h2>
      <p className="text-gray-500 text-sm">{selectedTemplate?.desc}</p>

      <form className="mt-6" onSubmit={onSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div className="my-2 flex flex-col gap-2 mb-7" key={index}>
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : null}
          </div>
        ))}
        <Button className="w-full py-6 text-white" type="submit" disabled={loading}>
          {loading && <Loader2Icon className="animate-spin" />}
          Generate Content
        </Button>
      </form>

      {/* AlertDialog to inform the user about credit limit */}
      <AlertDialogTemplate open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
};

export default FormSection;
