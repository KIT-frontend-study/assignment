import { useState } from "react";
import { createPost } from "../api/createPost";

const INITIAL_FORM_VALUES = {
  title: "",
  content: "",
  author: "",
};

export function useCreatePostForm() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = ({ field, value }) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  const submitPost = async () => {
    setIsSubmitting(true);

    await createPost(formValues);

    setFormValues(INITIAL_FORM_VALUES);
    setIsSubmitting(false);
  };

  return {
    formValues,
    isSubmitting,
    handleFieldChange,
    submitPost,
  };
}
