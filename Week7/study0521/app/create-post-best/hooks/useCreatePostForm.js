// 폼 상호작용 소유자: 입력값 상태, 제출 중 상태, 제출 흐름을 책임진다.
// DOM 이벤트나 input 태그 구조는 모르고, field/value라는 폼 의도만 받아 상태를 바꾼다.
// API 호출 세부사항은 createPost에 위임해서 "게시글 생성 폼" 유스케이스에만 집중한다.
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
