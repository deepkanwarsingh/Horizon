import React from "react";
import {
  REPORT_TYPES,
  TIME_PERIODS,
  UI_TEXT,
  PREVIEW_FIELDS,
} from "../utils/analytics";
import Workspace from "../components/WorkSpace";
import Card from "../components/subComponents/Card";
import Form from "../components/Form";
import Select from "../components/subComponents/Select";
import Input from "../components/subComponents/Input";
import useAnalyticsForm from "../hooks/useAnalyticsForm";
import { useAppSelector } from "../hooks/reduxHooks";
import { toast } from "react-toastify";

const Analytics = () => {
  const {
    form,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
  } = useAnalyticsForm();

  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e);

    toast.success("Form submitted successfully!");
  };

  return (
    <Workspace
      subtitle="Workspace"
      title={UI_TEXT.title}
      description={UI_TEXT.description}
    >
      <Card
        className={`mx-auto max-w-2xl ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : ""
        }`}
      >
        <div
          className={`${
            isDarkMode
              ? "text-white [&_label]:text-gray-300 [&_h2]:text-white [&_p]:text-gray-300"
              : ""
          }`}
        >
          <Form
            onSubmit={onSubmit}
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
        </div>

        <div
          className={`mt-8 rounded-xl p-5 ${
            isDarkMode
              ? "bg-gray-900 text-white"
              : "bg-gray-50"
          }`}
        >
          <h2
            className={`mb-4 text-lg font-semibold ${
              isDarkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            {UI_TEXT.previewTitle}
          </h2>

          <div
            className={`space-y-2 text-sm ${
              isDarkMode
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            {PREVIEW_FIELDS.map(({ key, label }) => (
              <p key={key}>
                <strong>{label}:</strong> {form[key]}
              </p>
            ))}
          </div>
        </div>
      </Card>
    </Workspace>
  );
};

export default Analytics;