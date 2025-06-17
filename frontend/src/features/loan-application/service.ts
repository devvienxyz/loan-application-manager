import api from "@/lib/axios";

// export const getLoans = async () => {
//   const res = await api.get("/loans");
//   return res.data;
// };

export const fetchLoans = async ({ queryKey }: { queryKey: any }) => {
  const [_key, { page, pageSize, search }] = queryKey;

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
  });

  const res = await api.get(`/loans?${params.toString()}`);
  return res.data;
};
