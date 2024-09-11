import { api } from "../api/api";

export const handleSubmit = async (
  method,
  url,
  createFormData,
  { setSubmitting },
  handleAddClose,
  queryClient,
  keyClient
) => {
  try {
    const formData = createFormData;
    api(method, url, formData, queryClient, keyClient);
    // Setelah berhasil menghapus, refetch data
    await queryClient.invalidateQueries(`${keyClient}`);

    // Menunggu hingga refetch selesai
    await queryClient.refetchQueries(`${keyClient}`);

    handleAddClose();
  } catch (error) {
    console.error("Failed to add data:", error);
  } finally {
    setSubmitting(false);
  }
};

export const handleDelete = async (hapus, url, queryClient, keyClient) => {
  try {
    api(hapus, url, "");
    // Setelah berhasil menghapus, refetch data
    await queryClient.invalidateQueries(`${keyClient}`);

    // Menunggu hingga refetch selesai
    await queryClient.refetchQueries(`${keyClient}`);
  } catch (error) {
    console.error("Failed to delete facility:", error);
  }
};
