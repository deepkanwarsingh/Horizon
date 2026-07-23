const useUnsafeContent = () => {
  const containsUnsafeContent = (value: string): boolean => {
    return (
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi.test(value) ||
      /<[^>]+>/g.test(value) ||
      /javascript\s*:/i.test(value)
    );
  };

  return { containsUnsafeContent };
};

export default useUnsafeContent;