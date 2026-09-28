"use client";
import { useState } from "react";
import { Ads } from "../types/type.ads";
import { Edit3, Eye, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { DeleteDialogAds } from "./Dialog/DeleteDialog";
import { UpdateDialogAds } from "./Dialog/UpdateDialog";
interface AdsTableProps {
  ads: Ads[];
}

export default function AdsTable({ ads }: AdsTableProps) {
  const [adsSearch, setAdsSearch] = useState("");
  // select ads
  const[selectedAds, setSelectedAds] = useState<Ads | undefined>(undefined);
  // delete Ads Dialog
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  // update ads dialog
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);


  const filterAds = ads.filter((ad) => {
    return (
      ad.room.roomNumber
        .toLowerCase()
        .toString()
        .includes(adsSearch.toLowerCase()) ||
      ad.room.price.toString().includes(adsSearch) ||
      ad.room.capacity.toString().includes(adsSearch) ||
      ad.isActive.toString().includes(adsSearch) ||
      ad.createdBy?.userName.toLowerCase().includes(adsSearch.toLowerCase())
    );
  });
  return (
    <>
      {/* ============ Search ============ */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9189]" />
        <input
          type="text"
          value={adsSearch}
          onChange={(e) => setAdsSearch(e.target.value)}
          placeholder="Search by room number, user, or facility..."
          className="h-10 w-full rounded-xl border border-[#E4E7E2] bg-[#F8F9F7] py-2.5 pl-10 pr-4 text-sm text-[#303530] placeholder:text-[#8A9189] transition-all focus:border-[#4E604F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4E604F]/10"
        />
      </div>
      <DeleteDialogAds
      isOpen={isOpenDelete}
      onOpenChange={setIsOpenDelete}
      adsId={selectedAds?._id}
      />
      <UpdateDialogAds
      isOpen={isOpenUpdate}
      onOpenChange={setIsOpenUpdate}
      ads={selectedAds}
      />
      <div className="overflow-hidden rounded-xl border border-[#4E604F]/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#4E604F]/10 bg-[#4E604F]/5">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Room
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Price
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Capacity
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Discount
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-[#1B1C1C]">
                  Created By
                </th>

                <th className="px-6 py-4 text-right text-sm font-semibold text-[#1B1C1C]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#4E604F]/10">
              {filterAds.map((ad) => (
                <tr
                  key={ad._id}
                  className="transition-colors hover:bg-[#4E604F]/5"
                >
                  {/* Room */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-[#4E604F]/10">
                        {ad.room.images?.[0] ? (
                          <img
                            src={ad.room.images[0]}
                            alt={`Room ${ad.room.roomNumber}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-[#434842]/50">
                            No img
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="font-semibold text-[#1B1C1C]">
                          Room {ad.room.roomNumber}
                        </p>

                        <p className="text-xs text-[#434842]/60">
                          ID: {ad.room._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="font-medium text-[#1B1C1C]">
                      ${ad.room.price}
                    </span>
                  </td>

                  {/* Capacity */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#434842]">
                      {ad.room.capacity}{" "}
                      {ad.room.capacity === 1 ? "guest" : "guests"}
                    </span>
                  </td>

                  {/* Discount */}
                  <td className="px-6 py-4">
                    {ad.room.discount > 0 ? (
                      <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-600">
                        {ad.room.discount}% OFF
                      </span>
                    ) : (
                      <span className="text-sm text-[#434842]/50">—</span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        ad.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`mr-2 h-1.5 w-1.5 rounded-full ${
                          ad.isActive ? "bg-green-600" : "bg-red-500"
                        }`}
                      />

                      {ad.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Created By */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-[#434842]">
                      {ad.createdBy?.userName ?? "Unknown"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 lg:px-5">
                    <div className="flex items-center justify-end gap-0.5">
                      <Link
                        href={`/dashboard/ads/${ad._id}`}
                        aria-label={`View room ${ad.room.roomNumber}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-[#F4F6F2] hover:text-[#4E604F]"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label={`Update room ${ad.room.roomNumber}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                      onClick={()=>{
                        setSelectedAds(ad);
                        setIsOpenUpdate(true)
                      }}
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete room ${ad.room.roomNumber}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-[#666B65] transition-colors hover:bg-red-50 hover:text-red-600"
                        onClick={() => {
                          setSelectedAds(ad);
                          setIsOpenDelete(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filterAds.length === 0 && (
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-[#434842]/60">No ads found.</p>
          </div>
        )}
      </div>
    </>
  );
}
