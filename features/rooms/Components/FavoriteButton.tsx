// import { getToken } from "@/lib/cookies/cookies";
// import { getFavoriteRooms } from "@/features/favorite/service/favourite.service";
// import FavoriteButtonClient from "./FavoriteButtonClient";

// interface FavoriteButtonProps {
//   roomId: string;
// }

// export default async function FavoriteButton({
//   roomId,
// }: FavoriteButtonProps) {
//   const token = await getToken();

//   // User is not logged in
//   if (!token) {
//     return <FavoriteButtonClient roomId={roomId} isFavourite={false} />;
//   }

//   // User is logged in
//   const favoriteData = await getFavoriteRooms();

//   const isFavourite = favoriteData.data.favoriteRooms.some((favorite) =>
//     favorite.rooms.some(
//       (favoriteRoom) => favoriteRoom._id === roomId
//     )
//   );

//   return (
//     <FavoriteButtonClient
//       roomId={roomId}
//       isFavourite={isFavourite}
//     />
//   );
// }