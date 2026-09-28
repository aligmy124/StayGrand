import { Mail, Phone, MapPin, Shield } from "lucide-react";
import type { IProfileUser } from "../types/type.user";

interface AccountDetailsProps {
  user: IProfileUser;
}

export default function AccountDetails({ user }: AccountDetailsProps) {
  const accountDetails = [
    {
      label: "Email",
      value: user.email,
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: `+${user.phoneNumber}`,
      icon: Phone,
    },
    {
      label: "Country",
      value: user.country,
      icon: MapPin,
    },
    {
      label: "Role",
      value: user.role,
      icon: Shield,
    },
  ];

  return (
    <section aria-labelledby="account-details-heading">
      <div className="mb-4">
        <h3
          id="account-details-heading"
          className="text-base font-semibold text-[#303530]"
        >
          Account Details
        </h3>

        <p className="mt-1 text-sm text-[#8A9189]">
          Your basic account information.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {accountDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="group flex items-center gap-4 rounded-2xl border border-[#E8EAE6] bg-[#FAFBF9] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5DCD3] hover:bg-white hover:shadow-md"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-[#EEF0EC]">
                <Icon
                  className="h-5 w-5 text-[#4E604F]"
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-[#9AA099]">
                  {item.label}
                </p>

                <p className="mt-1 truncate text-sm font-semibold capitalize text-[#303530]">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}