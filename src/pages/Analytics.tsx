import React from "react";
import {
  REPORT_TYPES,
  TIME_PERIODS,
  UI_TEXT,
  PREVIEW_FIELDS,
} from "../constant/analytics";
import Workspace from "../components/WorkSpace";
import Card from "../components/subComponents/Card";
import Form from "../components/Form";
import Select from "../components/subComponents/Select";
import Input from "../components/subComponents/Input";
import useAnalyticsForm from "../hooks/useAnalyticsForm";

const Analytics = () => {
  const {
    form,
    errors,
    isFormValid,
    handleInputChange,
    handleSubmit,
  } = useAnalyticsForm();

  return (
    <Workspace
      subtitle="Workspace"
      title={UI_TEXT.title}
      description={UI_TEXT.description}
    >
      <Card className="mx-auto max-w-2xl">
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