export const useAuthPage = () => {
  const route = useRoute();

  const isAuthPage = computed(() =>
    ["/register", "/forget-password", "/admin-login"].includes(route.path)
  );

  return { isAuthPage };
};
