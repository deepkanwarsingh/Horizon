import { useEffect, useState } from "react";
import {
  INITIAL_FORM,
  INITIAL_ERRORS,
  REPORT_TYPES,
  TIME_PERIODS,
  EMAIL_REGEX,
  LETTERS_ONLY_REGEX,
  VALIDATION_MESSAGES,
  UI_TEXT,
} from "../constant/analytics";
import useUnsafeContent from "./useUnsafeContent";

const useAnalyticsForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isFormValid, setIsFormValid] = useState(false);

  const { containsUnsafeContent } = useUnsafeContent();

  const validateField = (
    name: keyof typeof INITIAL_FORM,
    value: string
  ): string => {
    switch (name) {
      case "reportName":
        return !value.trim()
          ? VALIDATION_MESSAGES.reportNameRequired
          : value.length < 3
          ? VALIDATION_MESSAGES.reportNameMin
          : "";

      case "email":
        return !value.trim()
          ? VALIDATION_MESSAGES.emailRequired
          : !EMAIL_REGEX.test(value)
          ? VALIDATION_MESSAGES.emailInvalid
          : "";

      case "department":
        return !value.trim()
          ? VALIDATION_MESSAGES.departmentRequired
          : !LETTERS_ONLY_REGEX.test(value)
          ? VALIDATION_MESSAGES.departmentInvalid
          : "";

      case "reportType":
        return !value
          ? VALIDATION_MESSAGES.reportTypeRequired
          : "";

      case "timePeriod":
        return !value
          ? VALIDATION_MESSAGES.timePeriodRequired
          : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    setIsFormValid(
      Object.values(errors).every((error) => !error) &&
        Object.values(form).every((value) => value.trim() !== "")
    );
  }, [form, errors]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    const key = name as keyof typeof INITIAL_FORM;

    // Remove spaces from email
    if (key === "email") {
      value = value.replace(/\s/g, "");
    }

    // Collapse multiple spaces
    if (key === "reportName") {
      value = value.replace(/\s{2,}/g, " ");
    }

    // Unsafe content validation
    if (containsUnsafeContent(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: VALIDATION_MESSAGES.unsafeContent,
      }));
      return;
    }

    // Dropdown validation
    if (
      key === "reportType" &&
      value &&
      !REPORT_TYPES.includes(value)
    ) {
      return;
    }

    if (
      key === "timePeriod" &&
      value &&
      !TIME_PERIODS.includes(value)
    ) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: validateField(key, value),
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const newErrors = Object.keys(form).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(
          key as keyof typeof INITIAL_FORM,
          form[key as keyof typeof INITIAL_FORM]
        ),
      }),
      {} as typeof INITIAL_ERRORS
    );

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    alert(UI_TEXT.submitSuccess);
  };

  return {
    form,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
  };
};

export default useAnalyticsForm;