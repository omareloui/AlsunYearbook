export function useModelWrapper(
  props: { modelValue: string },
  emit: (event: "update:modelValue", ...args: any[]) => void
) {
  return computed({
    get: () => props.modelValue,
    set: value => emit("update:modelValue", value),
  });
}
