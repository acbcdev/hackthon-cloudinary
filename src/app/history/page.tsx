import { generetaImageDescription } from "@/actions/ai";
import DynamicInterface from "@/components/DynamicInterface";
import { getCldImageUrl } from "next-cloudinary";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.img) redirect("/");

  const url = getCldImageUrl({
    width: 960,
    height: 600,
    src: searchParams.img,
  });

  const { options, error, imgDescription } = await generetaImageDescription(
    url
  );
  if (error) revalidatePath("/history");
  return (
    <DynamicInterface
      imgDescription={imgDescription ?? ""}
      img={url}
      options={options.map((i) => i.label)}
    />
  );
}
