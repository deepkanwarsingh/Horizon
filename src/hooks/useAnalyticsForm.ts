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
} from "../utils/analytics";
import useUnsafeContent from "./useUnsafeContent";
import useDebounce from "./useDebounce";
import { useAppDispatch } from "./reduxHooks";
import { showNotification } from "../features/notifications/notificationSlice";



const useAnalyticsForm = () => {
  const dispatch = useAppDispatch();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isFormValid, setIsFormValid] = useState(false);

  const [touched, setTouched] = useState({
    reportName: false,
    email: false,
    department: false,
    reportType: false,
    timePeriod: false,
  });

  const { containsUnsafeContent } = useUnsafeContent();

  // Debounce entire form
  const debouncedForm = useDebounce(form, 500);

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

  // Debounced validation
  useEffect(() => {
    const newErrors = { ...INITIAL_ERRORS };

    (
      Object.keys(debouncedForm) as Array<
        keyof typeof INITIAL_FORM
      >
    ).forEach((key) => {
      if (touched[key]) {
        newErrors[key] = validateField(
          key,
          debouncedForm[key]
        );
      }
    });

    setErrors(newErrors);

    const valid =
      Object.values(newErrors).every((e) => !e) &&
      Object.values(debouncedForm).every(
        (v) => v.trim() !== ""
      );

    setIsFormValid(valid);
  }, [debouncedForm, touched]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name } = e.target;
    let { value } = e.target;

    const key = name as keyof typeof INITIAL_FORM;

    setTouched((prev) => ({
      ...prev,
      [key]: true,
    }));

    if (key === "email") {
      value = value.replace(/\s/g, "");
    }

    if (key === "reportName") {
      value = value.replace(/\s{2,}/g, " ");
    }

    if (containsUnsafeContent(value)) {
      setErrors((prev) => ({
        ...prev,
        [key]: VALIDATION_MESSAGES.unsafeContent,
      }));

      return;
    }

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

    // Update immediately
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setTouched({
      reportName: true,
      email: true,
      department: true,
      reportType: true,
      timePeriod: true,
    });

    const newErrors = (
      Object.keys(form) as Array<
        keyof typeof INITIAL_FORM
      >
    ).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(key, form[key]),
      }),
      {} as typeof INITIAL_ERRORS
    );

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    dispatch(
      showNotification({
        type: "success",
        message: UI_TEXT.submitSuccess,
      })
    );
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