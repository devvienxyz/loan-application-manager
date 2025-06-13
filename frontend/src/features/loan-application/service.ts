import api from "@/lib/axios";

export const getLoans = async () => {
	const res = await api.get("/loans");
	return res.data;
};
