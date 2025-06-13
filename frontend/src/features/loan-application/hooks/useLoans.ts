import { useQuery } from "@tanstack/react-query";
import { getLoans } from "../service";

export const useLoans = () =>
	useQuery({
		queryKey: ["loans"],
		queryFn: getLoans,
		staleTime: 1000 * 60 * 5, // 5 mins cache
		retry: 1,
	});
