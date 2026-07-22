import React, { useState } from "react";

const Analytics = () => {
  const [form, setForm] = useState({
    reportName: "",
    email: "",
    department: "",
    reportType: "",
    timePeriod: "",
  });

  const [errors, setErrors] = useState({
    reportName: "",
    email: "",
    department: "",
    reportType: "",
    timePeriod: "",
  });

  const validateField = (
    name: keyof typeof form,
    value: string
  ): string => {
    switch (name) {
      case "reportName":
        if (value.trim() === "") return "Report name is required.";
        if (value.length < 3) return "Minimum 3 characters.";
        return "";

      case "email":
        if (value.trim() === "") return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return "Enter a valid email address.";
        return "";

      case "department":
        if (value.trim() === "") return "Department is required.";
        if (!/^[A-Za-z ]+$/.test(value))
          return "Only letters are allowed.";
        return "";

      case "reportType":
        if (value === "") return "Please select a report type.";
        return "";

      case "timePeriod":
        if (value === "") return "Please select a time period.";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name as keyof typeof form;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleReportTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    const allowedTypes = [
      "Sales",
      "Marketing",
      "Finance",
      "Operations",
    ];

    if (!allowedTypes.includes(value)) return;

    setForm((prev) => ({
      ...prev,
      reportType: value,
    }));

    setErrors((prev) => ({
      ...prev,
      reportType: "",
    }));
  };

  const handleTimePeriodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;

    const allowedPeriods = [
      "Daily",
      "Weekly",
      "Monthly",
      "Yearly",
    ];

    if (!allowedPeriods.includes(value)) return;

    setForm((prev) => ({
      ...prev,
      timePeriod: value,
    }));

    setErrors((prev) => ({
      ...prev,
      timePeriod: "",
    }));
  };

  const isFormValid =
    Object.values(errors).every((error) => error === "") &&
    Object.values(form).every((value) => value.trim() !== "");

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isFormValid) return;

    alert("Analytics form submitted successfully!");
  };

  const inputStyle =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Form
        </h1>

        <p className="mt-2 text-gray-500">
          Fill out the form below to generate an analytics report.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Report Name */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Report Name
            </label>

            <input
              type="text"
              name="reportName"
              value={form.reportName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Monthly Sales Report"
            />

            {errors.reportName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.reportName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputStyle}
              placeholder="example@email.com"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Department
            </label>

            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Marketing"
            />

            {errors.department && (
              <p className="mt-2 text-sm text-red-500">
                {errors.department}
              </p>
            )}
          </div>

          {/* Report Type */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Report Type
            </label>

            <select
              value={form.reportType}
              onChange={handleReportTypeChange}
              className={inputStyle}
            >
              <option value="">Select Report Type</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
            </select>

            {errors.reportType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.reportType}
              </p>
            )}
          </div>

          {/* Time Period */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Time Period
            </label>

            <select
              value={form.timePeriod}
              onChange={handleTimePeriodChange}
              className={inputStyle}
            >
              <option value="">Select Time Period</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>

            {errors.timePeriod && (
              <p className="mt-2 text-sm text-red-500">
                {errors.timePeriod}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full rounded-xl py-3 font-semibold transition ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            Generate Report
          </button>

        </form>

        <div className="mt-8 rounded-xl bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Live Preview
          </h2>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Report:</strong> {form.reportName}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Department:</strong> {form.department}</p>
            <p><strong>Report Type:</strong> {form.reportType}</p>
            <p><strong>Time Period:</strong> {form.timePeriod}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;