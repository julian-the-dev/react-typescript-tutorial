const formatValue = (item: Object | string): string => {
  if (!item) {
    return "";
  }
  return typeof item === 'string' ? item : ((item as any).value) as string;
};

export default formatValue;
