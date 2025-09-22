import { UserEntity } from "@/components/users/entity";
import { UserForm } from "@/components/users/UserForm";

const fetchUserDetail = async (id: string) => {
  const result = await fetch(
    `https://68ce1f186dc3f350777e2b76.mockapi.io/api/v1/users/${id}` // string template
  );
  if (result.ok) {
    const data: UserEntity = await result.json();
    return data;
  } else {
    throw new Error("Gagal Mengambil Data");
  }
};

const UserEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const pageParams = await params;
  const user = await fetchUserDetail(pageParams.id);

  return (
    <div>
      Edit User
      <UserForm user={user} />
    </div>
  );
};

export default UserEditPage;
