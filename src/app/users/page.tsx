import { UserEntity } from "@/components/users/entity";
import { UserIndexTable } from "@/components/users/UserIndexTable";

const indexUser = async () => {
  const result = await fetch(
    "https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users"
  );
  if (result.ok) {
    const data: UserEntity[] = await result.json();
    return data;
  } else {
    throw new Error("Gagal Mengambil Data");
  }
};

const UserIndexPage = async () => {
  const data = await indexUser();

  return (
    <div>
      User Index
      <UserIndexTable users={data} />
    </div>
  );
};

export default UserIndexPage;
