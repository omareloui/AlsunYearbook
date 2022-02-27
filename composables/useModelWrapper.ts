export function useModelWrapper(
  props: any,
  emit: (event: "update:modelValue", ...args: any[]) => void
) {
  return computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value),
  });
}
