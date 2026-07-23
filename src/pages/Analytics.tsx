import React, { useEffect, useState } from "react";
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
import Form from "../components/Form";
import Select from "../components/subComponents/Select";
import Input from "../components/subComponents/Input";

const Analytics = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isFormValid, setIsFormValid] = useState(false);

  const inputStyle =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const validateField = (
    name: keyof typeof form,
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
      Object.values(errors).every((e) => !e) &&
        Object.values(form).every((v) => v.trim() !== "")
    );
  }, [form, errors]);

const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name } = e.target;
  let { value } = e.target;
  const key = name as keyof typeof form;

  // Remove all spaces from email
  if (key === "email") {
    value = value.replace(/\s/g, "");
  }

  // Collapse multiple spaces in Report Name
  if (key === "reportName") {
    value = value.replace(/\s{2,}/g, " ");
  }

  // Block HTML tags, <script> tags, and javascript: URLs
  const hasUnsafeContent =
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value) ||
    /<[^>]+>/g.test(value) ||
    /javascript\s*:/i.test(value);

  if (hasUnsafeContent) {
    setErrors((prev) => ({
      ...prev,
      [key]:
        "HTML tags, script tags, or javascript: URLs are not allowed.",
    }));
    return;
  }

  if (
    key === "reportType" &&
    value &&
    !REPORT_TYPES.includes(value)
  )
    return;

  if (
    key === "timePeriod" &&
    value &&
    !TIME_PERIODS.includes(value)
  )
    return;

  setForm((prev) => ({
    ...prev,
    [key]: value,
  }));

  setErrors((prev) => ({
    ...prev,
    [key]: validateField(key, value),
  }));
};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = Object.keys(form).reduce(
      (acc, key) => ({
        ...acc,
        [key]: validateField(
          key as keyof typeof form,
          form[key as keyof typeof form]
        ),
      }),
      {} as typeof INITIAL_ERRORS
    );

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    alert("Analytics form submitted successfully!");
  };

  const renderInput = (
    name: keyof typeof form,
    label: string,
    placeholder: string,
    type = "text"
  ) => (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={inputStyle}
      />
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name]}
        </p>
      )}
    </div>
  );

  const renderSelect = (
    name: "reportType" | "timePeriod",
    label: string,
    placeholder: string,
    options: string[]
  ) => (
    <div>
      <label className="mb-2 block font-medium text-gray-700">
        {label}
      </label>
      <select
        name={name}
        value={form[name]}
        onChange={handleInputChange}
        className={inputStyle}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-2 text-sm text-red-500">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold">{UI_TEXT.title}</h1>
        <p className="mt-2 text-gray-500">{UI_TEXT.description}</p>

<Form
  onSubmit={handleSubmit}
  buttonText={UI_TEXT.submitButton}
  isButtonDisabled={!isFormValid}
>
  <Input
    label={UI_TEXT.reportNameLabel}
    name="reportName"
    value={form.reportName}
    placeholder={UI_TEXT.reportNamePlaceholder}
    onChange={handleInputChange}
    error={errors.reportName}
  />

  <Input
    type="email"
    label={UI_TEXT.emailLabel}
    name="email"
    value={form.email}
    placeholder={UI_TEXT.emailPlaceholder}
    onChange={handleInputChange}
    error={errors.email}
  />

  <Input
    label={UI_TEXT.departmentLabel}
    name="department"
    value={form.department}
    placeholder={UI_TEXT.departmentPlaceholder}
    onChange={handleInputChange}
    error={errors.department}
  />

  <Select
    label={UI_TEXT.reportTypeLabel}
    name="reportType"
    value={form.reportType}
    placeholder={UI_TEXT.reportTypePlaceholder}
    options={REPORT_TYPES}
    onChange={handleInputChange}
    error={errors.reportType}
  />

  <Select
    label={UI_TEXT.timePeriodLabel}
    name="timePeriod"
    value={form.timePeriod}
    placeholder={UI_TEXT.timePeriodPlaceholder}
    options={TIME_PERIODS}
    onChange={handleInputChange}
    error={errors.timePeriod}
  />
</Form>

        <div className="mt-8 rounded-xl bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold">
            {UI_TEXT.previewTitle}
          </h2>

          <div className="space-y-2 text-sm">
            {[
              [UI_TEXT.reportNameLabel, form.reportName],
              [UI_TEXT.emailLabel, form.email],
              [UI_TEXT.departmentLabel, form.department],
              [UI_TEXT.reportTypeLabel, form.reportType],
              [UI_TEXT.timePeriodLabel, form.timePeriod],
            ].map(([label, value]) => (
              <p key={String(label)}>
                <strong>{label}:</strong> {value}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;