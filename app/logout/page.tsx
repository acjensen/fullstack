import { GET } from "./route";
import { useRouter } from "next/navigation";

export async function Page() {
  const router = useRouter();
  GET();
  router.back();
}
