import { UserEntity } from "@/components/users/entity";
import { UserIndexTable } from "@/components/users/UserIndexTable";

const indexUser = async (page: string, limit: string) => {
  const result = await fetch(
    `https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users?page=${page}&limit=${limit}`
  );
  if (result.ok) {
    const data: UserEntity[] = await result.json();
    return data;
  } else {
    throw new Error("Gagal Mengambil Data");
  }
};

const UserIndexPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const pageSearchParams = await searchParams; // null aware operator ??
  const data = await indexUser(
    pageSearchParams.page ?? "1",
    pageSearchParams.limit ?? "10"
  );

  return (
    <div>
      User Index
      {data.length}
      <UserIndexTable users={data} />
    </div>
  );
};

export default UserIndexPage;
