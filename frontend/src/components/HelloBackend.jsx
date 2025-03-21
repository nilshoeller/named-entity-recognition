import { useQuery } from "@tanstack/react-query";
import { getHelloBackend } from "../api/helloBackend";

export function HelloBackend() {
  const { status, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => getHelloBackend(),
  });
  return (
    <div>
      <h1>Hello Backend</h1>
      {status === "success" && JSON.stringify(data)}
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
    </div>
  );
}
