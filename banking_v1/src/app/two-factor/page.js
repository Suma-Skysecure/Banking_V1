import TwoFactorAuth from "@/components/TwoFactorAuth";
import Providers from "@/components/Providers";

export default function TwoFactorPage() {
  return (
    <Providers>
      <TwoFactorAuth />
    </Providers>
  );
}

